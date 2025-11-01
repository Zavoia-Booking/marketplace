export type AuthUser = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  emailVerified?: boolean;
  googleSub?: string | null;
  provider?: string;
  registeredVia?: string;
  providerData?: string | null;
  lastGoogleLoginAt?: Date | null;
};

export type AuthResponse = {
  message: string;
  accessToken: string;
  user: AuthUser;
  csrfToken: string | null;
};

export enum AuthStatusEnum {
  IDLE = "idle",
  LOADING = "loading",
  AUTHENTICATED = "authenticated",
  UNAUTHENTICATED = "unauthenticated",
  ERROR = "error",
}

export interface AuthState {
  accessToken: string | null;
  csrfToken: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  status: AuthStatusEnum;
  error: string | null;
  lastRefreshAt: number | null;
  isAccountLinkingModalOpen?: boolean;
  pendingLinkTxId?: string;
  linkingLoading?: boolean;
  linkingError?: string | null;
  isAccountLinkModalOpen?: boolean;
  accountLinkUserDetails?: {
    firstName: string;
    lastName: string;
    email: string;
  };
  accountLinkSending: boolean;
  accountLinkSendError: string | null;
  accountLinkSendSuccess: boolean;
  emailVerifying: boolean;
  emailVerifyError: string | null;
  emailVerifySuccess: boolean;
  accountLinkVerifying: boolean;
  accountLinkVerifyError: string | null;
  accountLinkVerifySuccess: boolean;
}

export type RegisterPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type HydrateSessionResponse = {
  accessToken: string;
  csrfToken: string | null;
  user: AuthUser;
};

export type RegisterResponse = AuthResponse;
export type LoginResponse = AuthResponse;
