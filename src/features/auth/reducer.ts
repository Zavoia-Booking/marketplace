import * as actions from "./actions";
import { hydrateSessionAction, loginAction, logoutAction, registerAction, setAuthLoadingAction, setAuthUserAction, setTokensAction, clearAuthErrorAction, googleAuthAction, openAccountLinkingModal, closeAccountLinkingModal, reauthForLinkAction, linkGoogleAction, unlinkGoogleAction, openAccountLinkModal, closeAccountLinkModal, sendAccountLinkAction, verifyEmailAction, verifyAccountLinkAction } from "./actions";
import type { AuthState } from "./types";
import { AuthStatusEnum } from "./types";
import { getType, type ActionType } from "typesafe-actions";
import { type Reducer } from "redux";

type Actions = ActionType<typeof actions>

const initialState: AuthState = {
  accessToken: null,
  csrfToken: null,
  user: null,
  isAuthenticated: false,
  isLoading: false,
  status: AuthStatusEnum.IDLE,
  error: null,
  lastRefreshAt: null,
  isAccountLinkingModalOpen: false,
  pendingLinkTxId: undefined,
  linkingLoading: false,
  linkingError: null,
  isAccountLinkModalOpen: false,
  accountLinkUserDetails: undefined,
  accountLinkSending: false,
  accountLinkSendError: null,
  accountLinkSendSuccess: false,
  emailVerifying: false,
  emailVerifyError: null,
  emailVerifySuccess: false,
  accountLinkVerifying: false,
  accountLinkVerifyError: null,
  accountLinkVerifySuccess: false,
};

export const AuthReducer: Reducer<AuthState, any> = (state: AuthState = initialState, action: Actions) => {
  switch (action.type) {
    case getType(registerAction.request): {
      return { ...state, isLoading: true };
    }

    case getType(registerAction.success): {
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        error: null,
        status: AuthStatusEnum.AUTHENTICATED,
      };
    }

    case getType(registerAction.failure): {
      return {
        ...state,
        isAuthenticated: false,
        error: action.payload.message,
        status: AuthStatusEnum.ERROR,
      };
    }
    
    case getType(setAuthLoadingAction): {
      return { ...state, isLoading: action.payload.isLoading };
    }

    case getType(loginAction.request): {
      return { ...state, isLoading: true };
    }

    case getType(loginAction.success): {
      const { user } = action.payload;
      return {
        ...state,
        isAuthenticated: true,
        user,
        error: null,
        isLoading: false,
        status: AuthStatusEnum.AUTHENTICATED,
      };
    }

    case getType(loginAction.failure): {
      return {
        ...state,
        isAuthenticated: false,
        error: action.payload.message,
        isLoading: false,
        status: AuthStatusEnum.UNAUTHENTICATED,
      };
    }

    case getType(setAuthUserAction): {
      return {
        ...state,
        isAuthenticated: !!action.payload.user,
        user: action.payload.user,
        status: action.payload.user ? AuthStatusEnum.AUTHENTICATED : AuthStatusEnum.UNAUTHENTICATED,
      };
    }

    case getType(setTokensAction): {
      const { accessToken, csrfToken } = action.payload as { accessToken: string | null; csrfToken?: string | null };
      return {
        ...state,
        accessToken,
        csrfToken: typeof csrfToken !== "undefined" ? csrfToken : state.csrfToken,
        isAuthenticated: !!accessToken,
        status: accessToken ? AuthStatusEnum.AUTHENTICATED : AuthStatusEnum.UNAUTHENTICATED,
        error: null,
        lastRefreshAt: accessToken ? Date.now() : null,
      };
    }

    case getType(hydrateSessionAction.success): {
      const { accessToken, csrfToken, user } = action.payload;
      return {
        ...state,
        accessToken,
        csrfToken,
        user: user ?? state.user,
        isAuthenticated: true,
        status: AuthStatusEnum.AUTHENTICATED,
        error: null,
        lastRefreshAt: Date.now(),
      };
    }

    case getType(hydrateSessionAction.failure): {
      return {
        ...state,
        accessToken: null,
        isAuthenticated: false,
        status: AuthStatusEnum.UNAUTHENTICATED,
        error: action.payload.message,
        lastRefreshAt: null,
      };
    }

    case getType(logoutAction.success): {
      return { ...initialState };
    }

    case getType(logoutAction.failure): {
      return { ...state, error: action.payload.message };
    }

    case getType(clearAuthErrorAction): {
      return { ...state, error: null };
    }

    case getType(openAccountLinkingModal): {
      return { ...state, isAccountLinkingModalOpen: true, pendingLinkTxId: action.payload.txId } as any;
    }

    case getType(closeAccountLinkingModal): {
      return { ...state, isAccountLinkingModalOpen: false, pendingLinkTxId: null } as any;
    }

    // Linking flow states
    case getType(reauthForLinkAction.request):
    case getType(linkGoogleAction.request): {
      return { ...state, linkingLoading: true, linkingError: null } as any;
    }

    case getType(reauthForLinkAction.failure):
    case getType(linkGoogleAction.failure): {
      return { ...state, linkingLoading: false, linkingError: (action as any).payload.message } as any;
    }

    case getType(linkGoogleAction.success): {
      return { ...state, linkingLoading: false, linkingError: null, isAccountLinkingModalOpen: false, pendingLinkTxId: undefined } as any;
    }

    // Unlink Google account handlers
    case getType(unlinkGoogleAction.request): {
      return { ...state, linkingLoading: true, linkingError: null } as any;
    }

    case getType(unlinkGoogleAction.success): {
      return { ...state, linkingLoading: false, linkingError: null } as any;
    }

    case getType(unlinkGoogleAction.failure): {
      return { ...state, linkingLoading: false, linkingError: (action as any).payload.message } as any;
    }

    case getType(googleAuthAction.request): {
      return { ...state, isLoading: true, error: null };
    }

    case getType(googleAuthAction.success): {
      const { accessToken, csrfToken, user } = action.payload;
      return {
        ...state,
        accessToken,
        csrfToken,
        user,
        isAuthenticated: true,
        isLoading: false,
        status: AuthStatusEnum.AUTHENTICATED,
        error: null,
      };
    }

    case getType(googleAuthAction.failure): {
      return {
        ...state,
        isLoading: false,
        error: action.payload.message,
        status: AuthStatusEnum.ERROR
      };
    }

    case getType(openAccountLinkModal): {
      return {
        ...state,
        isAccountLinkModalOpen: true,
        accountLinkUserDetails: action.payload
      };
    }

    case getType(closeAccountLinkModal): {
      return {
        ...state,
        isAccountLinkModalOpen: false,
        accountLinkUserDetails: undefined,
        accountLinkSending: false,
        accountLinkSendError: null,
        accountLinkSendSuccess: false,
      };
    }

    case getType(sendAccountLinkAction.request): {
      return {
        ...state,
        accountLinkSending: true,
        accountLinkSendError: null,
        accountLinkSendSuccess: false,
      };
    }

    case getType(sendAccountLinkAction.success): {
      return {
        ...state,
        accountLinkSending: false,
        accountLinkSendError: null,
        accountLinkSendSuccess: true,
      };
    }

    case getType(sendAccountLinkAction.failure): {
      return {
        ...state,
        accountLinkSending: false,
        accountLinkSendError: action.payload.message,
        accountLinkSendSuccess: false,
      };
    }

    case getType(verifyEmailAction.request): {
      return {
        ...state,
        emailVerifying: true,
        emailVerifyError: null,
        emailVerifySuccess: false,
      };
    }

    case getType(verifyEmailAction.success): {
      return {
        ...state,
        emailVerifying: false,
        emailVerifyError: null,
        emailVerifySuccess: true,
      };
    }

    case getType(verifyEmailAction.failure): {
      return {
        ...state,
        emailVerifying: false,
        emailVerifyError: action.payload.message,
        emailVerifySuccess: false,
      };
    }

    case getType(verifyAccountLinkAction.request): {
      return {
        ...state,
        isLoading: true,
        error: null, // Clear any previous errors
        accountLinkVerifying: true,
        accountLinkVerifyError: null,
        accountLinkVerifySuccess: false,
      };
    }

    case getType(verifyAccountLinkAction.success): {
      return {
        ...state,
        isLoading: false,
        error: null,
        accountLinkVerifying: false,
        accountLinkVerifyError: null,
        accountLinkVerifySuccess: true,
      };
    }

    case getType(verifyAccountLinkAction.failure): {
      return {
        ...state,
        isLoading: false,
        error: action.payload.message,
        accountLinkVerifying: false,
        accountLinkVerifyError: action.payload.message,
        accountLinkVerifySuccess: false,
      };
    }

    default:
      return state;
  }
}
