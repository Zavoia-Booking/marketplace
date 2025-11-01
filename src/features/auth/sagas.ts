import { takeLatest, call, put, all } from "redux-saga/effects";
import {
  setAuthLoadingAction,
  setAuthUserAction,
  setTokensAction,
  setCsrfToken,
  loginAction,
  registerAction,
  logoutAction,
  fetchCurrentUserAction,
  openAccountLinkModal,
  sendAccountLinkAction,
  verifyAccountLinkAction,
  verifyEmailAction,
  googleAuthAction,
  reauthForLinkAction,
  linkGoogleAction,
  closeAccountLinkingModal,
  unlinkGoogleAction,
  linkGoogleByCodeAction,
  openAccountLinkingModal
} from "./actions";
import { registerApi, logoutApi, loginApi, getCurrentUserApi, sendAccountLinkApi, verifyAccountLinkApi, verifyEmailApi, googleRegisterApi, googleLoginApi, reauthForLinkApi, linkGoogleApi, unlinkGoogleApi, linkGoogleByCodeApi } from "./api";
import type { AuthUser, LoginResponse, RegisterResponse } from "./types";
import { select } from "redux-saga/effects";
import type { RootState } from "../../store";
// import { reauthForLinkAction, linkGoogleAction, closeAccountLinkingModal, unlinkGoogleAction, linkGoogleByCodeAction } from "./actions";
// import { select } from "redux-saga/effects";
// import type { RootState } from "../../app/providers/store";
// import { refreshSession } from "../../shared/lib/http";

function* handleRegister(action: ReturnType<typeof registerAction.request>): Generator<any, void, any> {
  try {
    yield put(setAuthLoadingAction({ isLoading: true }));
    const response: RegisterResponse = yield call(registerApi, action.payload);

    // Store access token in Redux (memory) + optional CSRF token
    yield put(setTokensAction({ accessToken: response.accessToken, csrfToken: response.csrfToken ?? null }));
    if (response.csrfToken) {
        yield put(setCsrfToken({ csrfToken: response.csrfToken }));
    }

    // Store user
    yield put(setAuthUserAction({ user: response.user }));
    yield put(registerAction.success(response));
  } catch (error: any) {
    // Handle 409 Conflict - Account already exists
    if (error?.response?.status === 409) {
      const errorData = error.response.data;
      if (errorData?.code === 'account_exists_needs_marketplace_access') {
        // Open account link modal with user details
        yield put(openAccountLinkModal({
          firstName: errorData.details?.firstName || action.payload.firstName,
          lastName: errorData.details?.lastName || action.payload.lastName,
          email: action.payload.email
        }));
        yield put(registerAction.failure({ message: 'Account already exists' }));
        return;
      }
    }

    let message = "Registration failed";
    
    if (error?.response?.data?.message) {
      // Handle array of messages or single message
      const backendMessage = error.response.data.message;
      message = Array.isArray(backendMessage) ? backendMessage[0] : backendMessage;
    } else if (error?.response?.data?.error) {
      message = error.response.data.error;
    } else if (error?.message) {
      message = error.message;
    }
    
    yield put(registerAction.failure({ message }));
  } finally {
    yield put(setAuthLoadingAction({ isLoading: false }));
  }
}

function* handleLogout(): Generator<any, void, any> {
  try {
    yield call(logoutApi);

    yield put(logoutAction.success());
  } catch (error: any) {
    const message = error?.response?.data?.error || error?.message || "Logout failed";
    yield put(logoutAction.failure({ message }));
  }
}

function* handleLogin(action: ReturnType<typeof loginAction.request>): Generator<any, void, any> {
  try {
    yield put(setAuthLoadingAction({ isLoading: true }));
    const response: LoginResponse = yield call(loginApi, action.payload);

    // Store access token in Redux (memory) + optional CSRF token
    yield put(setTokensAction({ accessToken: response.accessToken, csrfToken: response.csrfToken ?? null }));

    // Store user
    yield put(setAuthUserAction({ user: response.user }));
    // Ensure latest user data
    yield put(fetchCurrentUserAction.request());
    yield put(loginAction.success(response));
  } catch (error: any) {
    // Handle 409 Conflict - Account exists but needs marketplace access
    if (error?.response?.status === 409) {
      const errorData = error.response.data;
      if (errorData?.code === 'account_exists_needs_marketplace_access') {
        // Open account link modal with user details
        yield put(openAccountLinkModal({
          firstName: errorData.details?.firstName || '',
          lastName: errorData.details?.lastName || '',
          email: errorData.details?.email || action.payload.email
        }));
        yield put(loginAction.failure({ message: 'Account exists but needs marketplace access' }));
        return;
      }
    }

    let message = "Login failed";
    
    if (error?.response?.data?.message) {
      // Handle array of messages or single message
      const backendMessage = error.response.data.message;
      message = Array.isArray(backendMessage) ? backendMessage[0] : backendMessage;
    } else if (error?.response?.data?.error) {
      message = error.response.data.error;
    } else if (error?.message) {
      message = error.message;
    }
    
    yield put(loginAction.failure({ message }));
  } finally {
    yield put(setAuthLoadingAction({ isLoading: false }));
  }
}

function* handleFetchCurrentUser(): Generator<any, void, any> {
  try {
    const { user }: { user: AuthUser } = yield call(getCurrentUserApi);
    yield put(setAuthUserAction({ user }));
  } catch (error: any) {
    const message = error?.response?.data?.error || error?.message || "Fetch current user failed";
    yield put(fetchCurrentUserAction.failure({ message }));
  }
}

function* handleSendAccountLink(action: ReturnType<typeof sendAccountLinkAction.request>): Generator<any, void, any> {
  try {
    const response = yield call(sendAccountLinkApi, action.payload);
    yield put(sendAccountLinkAction.success(response));
  } catch (error: any) {
    // Handle message as array or string
    const rawMessage = error?.response?.data?.message || error?.message || "Failed to send account link";
    const message = Array.isArray(rawMessage) ? rawMessage[0] || rawMessage.join('. ') : rawMessage;
    yield put(sendAccountLinkAction.failure({ message }));
  }
}

function* handleVerifyAccountLink(action: ReturnType<typeof verifyAccountLinkAction.request>): Generator<any, void, any> {
  try {
    const response = yield call(verifyAccountLinkApi, action.payload.token);
    
    // Account link verified successfully - user needs to log in manually
    // Don't auto-login - just confirm success
    // Response structure: { message: string; user: AuthUser }
    yield put(verifyAccountLinkAction.success(response));
  } catch (error: any) {
    // Handle message as array or string
    const rawMessage = error?.response?.data?.message || error?.response?.data?.error || error?.message || "Failed to verify account link";
    const message = Array.isArray(rawMessage) ? rawMessage[0] || rawMessage.join('. ') : rawMessage;
    yield put(verifyAccountLinkAction.failure({ message }));
  }
}

function* handleVerifyEmail(action: ReturnType<typeof verifyEmailAction.request>): Generator<any, void, any> {
  try {
    const response = yield call(verifyEmailApi, action.payload.token);
    
    // Check if user is currently authenticated and update their data if email matches
    const currentState: RootState = yield select();
    const isAuthenticated = currentState.auth.isAuthenticated;
    const currentUser = currentState.auth.user;
    
    if (isAuthenticated && currentUser && currentUser.email === response.user.email) {
      // Update user data in Redux to reflect email verification
      yield put(setAuthUserAction({ user: { ...currentUser, emailVerified: true } }));
    }
    
    yield put(verifyEmailAction.success(response));
  } catch (error: any) {
    // Handle message as array or string
    const rawMessage = error?.response?.data?.message || error?.message || "Failed to verify email";
    const message = Array.isArray(rawMessage) ? rawMessage[0] || rawMessage.join('. ') : rawMessage;
    yield put(verifyEmailAction.failure({ message }));
  }
}

// function* handleForgotPassword(action: { type: string; payload: { email: string } }) {
//   try {
//     yield call(forgotPasswordApi, action.payload);
//   } catch (error: any) {
//     const message = error?.response?.data?.error || error?.message || "Forgot password failed";
//     yield put(forgotPasswordAction.failure(message));
//   }
// }

// function* handleResetPassword(action: { type: string; payload: { token: string, password: string } }) {
//   try {
//     yield call(resetPasswordApi, action.payload);
//     yield put(resetPasswordAction.success());
//   } catch (error: any) {
//     const message = error?.response?.data?.error || error?.message || "Reset password failed";
//     yield put(resetPasswordAction.failure(message));
//   }
// }

function* handleGoogleAuth(action: ReturnType<typeof googleAuthAction.request>): Generator<any, void, any> {
  try {
    yield put(setAuthLoadingAction({ isLoading: true }));
    
    // Check the mode from sessionStorage to determine which endpoint to call
    let mode = 'login';
    try {
      mode = sessionStorage.getItem('oauthMode') || 'login';
    } catch { /* empty */ }

    // Call the appropriate API based on mode
    const response = yield call(
      mode === 'register' ? googleRegisterApi : googleLoginApi,
      action.payload
    );

    // Store access token in Redux (memory) + optional CSRF token
    yield put(setTokensAction({ accessToken: response.accessToken, csrfToken: response.csrfToken ?? null }));
    
    if (response.csrfToken) {
      yield put(setCsrfToken({ csrfToken: response.csrfToken }));
    }

    // Store user
    yield put(setAuthUserAction({ user: response.user }));
    yield put(googleAuthAction.success({ 
      accessToken: response.accessToken, 
      csrfToken: response.csrfToken ?? null, 
      user: response.user 
    }));

    // Ensure latest user data (including Google linkage fields) after login
    yield put(fetchCurrentUserAction.request());

  } catch (error: any) {
    let message = "Google authentication failed";
    const code = error?.response?.data?.code;
    const details = error?.response?.data?.details;
    
    if (error?.response?.data?.message) {
      // Handle array of messages or single message
      const backendMessage = error.response.data.message;
      message = Array.isArray(backendMessage) ? backendMessage[0] : backendMessage;
    } else if (error?.response?.data?.error) {
      message = error.response.data.error;
    } else if (error?.message) {
      message = error.message;
    }
    
    // Handle account exists but needs marketplace access (business owner wanting marketplace access)
    if (error?.response?.status === 409 && code === 'account_exists_needs_marketplace_access') {
      const errorData = error.response.data;
      yield put(openAccountLinkModal({
        firstName: errorData.details?.firstName || '',
        lastName: errorData.details?.lastName || '',
        email: errorData.details?.email || ''
      }));
      yield put(googleAuthAction.failure({ message: 'Account already exists' }));
      return;
    }
    
    // Handle account exists but Google is not linked yet
    if (code === 'account_exists_unlinked_google') {
      try { sessionStorage.setItem('linkContext', 'register'); } catch { /* empty */ }
      yield put(openAccountLinkingModal({ suggestedNext: details?.suggestedNext, txId: details?.tx_id }));
      return;
    }

    yield put(googleAuthAction.failure({ message }));
  } finally {
    yield put(setAuthLoadingAction({ isLoading: false }));
  }
}

function* handleReauthForLink(action: ReturnType<typeof reauthForLinkAction.request>): Generator<any, void, any> {
  try {
    const txId: string | undefined = yield select((s: RootState) => s.auth.pendingLinkTxId);
    
    if (!txId) {
      yield put(reauthForLinkAction.failure({ message: 'Link session expired. Please try Google sign-in again.' }));
      yield put(closeAccountLinkingModal());
      return;
    }

    const res: { proof: string } = yield call(reauthForLinkApi, action.payload);
    yield put(reauthForLinkAction.success({ proof: res.proof }));
    yield put(linkGoogleAction.request({ tx_id: txId, proof: res.proof }));
  } catch (error: any) {
    let message = 'Verification failed';
    
    if (error?.response?.data?.message) {
      // Handle array of messages or single message
      const backendMessage = error.response.data.message;
      message = Array.isArray(backendMessage) ? backendMessage[0] : backendMessage;
    } else if (error?.response?.data?.error) {
      message = error.response.data.error;
    } else if (error?.message) {
      message = error.message;
    }
    
    yield put(reauthForLinkAction.failure({ message }));
  }
}

function* handleLinkGoogle(action: ReturnType<typeof linkGoogleAction.request>): Generator<any, void, any> {
  try {
    // Call linking API - now returns auth tokens
    const response = yield call(linkGoogleApi, action.payload);
    
    // Store authentication tokens (auto-login)
    yield put(setTokensAction({ accessToken: response.accessToken, csrfToken: response.csrfToken ?? null }));
    yield put(setAuthUserAction({ user: response.user }));
    
    // Also fetch current user to ensure we have the latest data
    yield put(fetchCurrentUserAction.request());
    
    // Close modal and show success
    yield put(linkGoogleAction.success({ message: 'Google account linked successfully!' }));
    yield put(closeAccountLinkingModal());
    
    // Clear context marker
    try { sessionStorage.removeItem('linkContext'); } catch { /* empty */ }
    
  } catch (error: any) {
    const message = error?.response?.data?.message || error?.response?.data?.error || 'Failed to link Google account';
    yield put(linkGoogleAction.failure({ message }));
  }
}

function* handleUnlinkGoogle(action: ReturnType<typeof unlinkGoogleAction.request>): Generator<any, void, any> {
  try {
    yield call(unlinkGoogleApi, action.payload);
    
    // Update user in Redux to remove Google data
    const currentUser: AuthUser | null = yield select((state: RootState) => state.auth.user);
    if (currentUser) {
      const updatedUser = {
        ...currentUser,
        googleSub: null,
        provider: currentUser.registeredVia === 'google' ? 'email' : currentUser.provider,
        providerData: null,
        lastGoogleLoginAt: null,
      };
      yield put(setAuthUserAction({ user: updatedUser }));
    }
    
    yield put(unlinkGoogleAction.success({ message: 'Google account unlinked successfully' }));
  } catch (error: any) {
    const message = error?.response?.data?.message || error?.response?.data?.error || error?.message || 'Failed to unlink Google account';
    yield put(unlinkGoogleAction.failure({ message }));
  }
}

function* handleLinkGoogleByCode(action: ReturnType<typeof linkGoogleByCodeAction.request>): Generator<any, void, any> {
  try {
    const response = yield call(linkGoogleByCodeApi, action.payload);
    // Update user in Redux
    yield put(setTokensAction({ accessToken: response.accessToken, csrfToken: response.csrfToken ?? null }));
    yield put(setAuthUserAction({ user: response.user }));
    yield put(linkGoogleByCodeAction.success({ message: 'Google account linked', user: response.user, accessToken: response.accessToken, csrfToken: response.csrfToken ?? null }));
    
    // Defer toast to Settings page after redirect
    try {
      sessionStorage.setItem('postLinkToast', 'Google account linked to your profile');
      sessionStorage.setItem('postLinkToastType', 'success');
    } catch { /* empty */ }
    
    // Route back to the stored returnTo if present
    setTimeout(() => {
      try {
        const returnTo = sessionStorage.getItem('oauthReturnTo') || '/profile/settings';
        sessionStorage.removeItem('oauthMode');
        sessionStorage.removeItem('oauthReturnTo');
        // Force immediate redirect
        window.location.href = returnTo;
      } catch (e) {
        console.error("Error handling OAuth redirect navigation:", e);
      }
    }, 100);
  } catch (error: any) {
    const message = error?.response?.data?.message || error?.response?.data?.error || error?.message || 'Failed to link Google account';
    yield put(linkGoogleByCodeAction.failure({ message }));
    // Defer toast to Settings page after redirect
    try {
      sessionStorage.setItem('postLinkToast', message);
      sessionStorage.setItem('postLinkToastType', 'error');
    } catch { /* empty */ }
    // Safety: if we're stuck on the callback route, bounce back to Settings so UI doesn't hang
    try {
      const returnTo = sessionStorage.getItem('oauthReturnTo') || '/profile/settings';
      sessionStorage.removeItem('oauthMode');
      sessionStorage.removeItem('oauthReturnTo');
      window.location.replace(returnTo);
    } catch { /* empty */ }
  }
}

export function* AuthSaga(): Generator<any, void, any> {
    yield all([
      takeLatest(registerAction.request, handleRegister),
      takeLatest(logoutAction.request, handleLogout),
      takeLatest(loginAction.request, handleLogin),
      takeLatest(fetchCurrentUserAction.request, handleFetchCurrentUser),
      takeLatest(sendAccountLinkAction.request, handleSendAccountLink),
      takeLatest(verifyAccountLinkAction.request, handleVerifyAccountLink),
      takeLatest(verifyEmailAction.request, handleVerifyEmail),
      takeLatest(googleAuthAction.request, handleGoogleAuth),
      takeLatest(reauthForLinkAction.request, handleReauthForLink),
      takeLatest(linkGoogleAction.request, handleLinkGoogle),
      takeLatest(linkGoogleByCodeAction.request, handleLinkGoogleByCode),
      takeLatest(unlinkGoogleAction.request, handleUnlinkGoogle),
    ]);
  }
