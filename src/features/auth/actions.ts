import { createAsyncAction, createAction } from "typesafe-actions";
import type { AuthUser, RegisterPayload, RegisterResponse, LoginPayload, LoginResponse, HydrateSessionResponse } from "./types";

export const setTokensAction = createAction(
  'auth/SET_TOKENS',
)<{ accessToken: string | null, csrfToken: string | null }>();

export const setAuthLoadingAction = createAction(
  'auth/SET_AUTH_LOADING',
)<{ isLoading: boolean }>();

export const setAuthUserAction = createAction(
  'auth/SET_AUTH_USER',
)<{ user: AuthUser | null }>();

export const setCsrfToken = createAction(
  'auth/SET_CSRF_TOKEN',
)<{ csrfToken: string | null }>();

export const hydrateSessionAction = createAsyncAction(
  'auth/HYDRATE_SESSION_REQUEST',
  'auth/HYDRATE_SESSION_SUCCESS',
  'auth/HYDRATE_SESSION_FAILURE',
)<void, HydrateSessionResponse, { message: string }>();

export const logoutAction = createAsyncAction(
  'auth/LOGOUT_REQUEST',
  'auth/LOGOUT_SUCCESS',
  'auth/LOGOUT_FAILURE',
)<void, void, { message: string }>();

export const loginAction = createAsyncAction(
  'auth/LOGIN_REQUEST',
  'auth/LOGIN_SUCCESS',
  'auth/LOGIN_FAILURE',
)<LoginPayload, LoginResponse, { message: string }>();

export const fetchCurrentUserAction = createAsyncAction(
  'auth/FETCH_CURRENT_USER_REQUEST',
  'auth/FETCH_CURRENT_USER_SUCCESS',
  'auth/FETCH_CURRENT_USER_FAILURE',
)<void, { user: AuthUser }, { message: string }>();

// export const forgotPasswordAction = createAsyncAction(
//   'auth/FORGOT_PASSWORD_REQUEST',
//   'auth/FORGOT_PASSWORD_SUCCESS',
//   'auth/FORGOT_PASSWORD_FAILURE',
// )<{ email: string }, void, { message: string }>();

// export const resetPasswordAction = createAsyncAction(
//   'auth/RESET_PASSWORD_REQUEST',
//   'auth/RESET_PASSWORD_SUCCESS',
//   'auth/RESET_PASSWORD_FAILURE',
// )<{ token: string, password: string }, void, { message: string }>();

export const clearAuthErrorAction = createAction(
  'auth/CLEAR_AUTH_ERROR',
)<void>();

export const registerAction = createAsyncAction(
  'auth/REGISTER_REQUEST',
  'auth/REGISTER_SUCCESS',
  'auth/REGISTER_FAILURE',
)<RegisterPayload, RegisterResponse, { message: string }>();

export const googleAuthAction = createAsyncAction(
  'auth/GOOGLE_AUTH_REQUEST',
  'auth/GOOGLE_AUTH_SUCCESS',
  'auth/GOOGLE_AUTH_FAILURE',
)<{ code: string, redirectUri: string }, { accessToken: string, csrfToken: string | null, user: AuthUser | null }, { message: string }>();

// In-flow Google collision modal controls
export const openAccountLinkingModal = createAction(
  'auth/OPEN_ACCOUNT_LINKING_MODAL',
)<{ suggestedNext?: string; txId?: string }>();

export const closeAccountLinkingModal = createAction(
  'auth/CLOSE_ACCOUNT_LINKING_MODAL',
)<void>();

// Re-auth then link actions
export const reauthForLinkAction = createAsyncAction(
  'auth/REAUTH_FOR_LINK_REQUEST',
  'auth/REAUTH_FOR_LINK_SUCCESS',
  'auth/REAUTH_FOR_LINK_FAILURE',
)<{ email: string; password: string }, { proof: string }, { message: string }>();

export const linkGoogleAction = createAsyncAction(
  'auth/LINK_GOOGLE_REQUEST',
  'auth/LINK_GOOGLE_SUCCESS',
  'auth/LINK_GOOGLE_FAILURE',
)<{ tx_id: string; proof: string }, { message: string }, { message: string }>();

export const unlinkGoogleAction = createAsyncAction(
  'auth/UNLINK_GOOGLE_REQUEST',
  'auth/UNLINK_GOOGLE_SUCCESS',
  'auth/UNLINK_GOOGLE_FAILURE',
)<{ password: string }, { message: string }, { message: string }>();

// Link Google from Settings by exchanging auth code (authenticated user)
export const linkGoogleByCodeAction = createAsyncAction(
  'auth/LINK_GOOGLE_BY_CODE_REQUEST',
  'auth/LINK_GOOGLE_BY_CODE_SUCCESS',
  'auth/LINK_GOOGLE_BY_CODE_FAILURE',
)<{ code: string; redirectUri: string }, { message: string; user: AuthUser; accessToken?: string; csrfToken?: string | null }, { message: string }>();

// Account linking for existing users
export const openAccountLinkModal = createAction(
  'auth/OPEN_ACCOUNT_LINK_MODAL',
)<{ firstName: string; lastName: string; email: string }>();

export const closeAccountLinkModal = createAction(
  'auth/CLOSE_ACCOUNT_LINK_MODAL',
)<void>();

export const sendAccountLinkAction = createAsyncAction(
  'auth/SEND_ACCOUNT_LINK_REQUEST',
  'auth/SEND_ACCOUNT_LINK_SUCCESS',
  'auth/SEND_ACCOUNT_LINK_FAILURE',
)<{ email: string }, { message: string }, { message: string }>();

export const verifyAccountLinkAction = createAsyncAction(
  'auth/VERIFY_ACCOUNT_LINK_REQUEST',
  'auth/VERIFY_ACCOUNT_LINK_SUCCESS',
  'auth/VERIFY_ACCOUNT_LINK_FAILURE',
)<{ token: string }, { message: string; user: AuthUser }, { message: string }>();

export const verifyEmailAction = createAsyncAction(
  'auth/VERIFY_EMAIL_REQUEST',
  'auth/VERIFY_EMAIL_SUCCESS',
  'auth/VERIFY_EMAIL_FAILURE',
)<{ token: string }, { message: string; success: boolean; user: AuthUser }, { message: string }>();