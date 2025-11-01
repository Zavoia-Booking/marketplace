import { apiClient } from "../../lib/http";
import type { AuthUser, LoginPayload, LoginResponse, RegisterPayload, RegisterResponse } from "./types";

export const registerApi = async (payload: RegisterPayload): Promise<RegisterResponse> => {
  const { data } = await apiClient().post<RegisterResponse>(`/marketplace/auth/register`, payload);
  return data;
}

export const logoutApi = async (): Promise<void> => {
  await apiClient().post(`/marketplace/auth/logout`);
}

export const loginApi = async (payload: LoginPayload): Promise<LoginResponse> => {
  const { data } = await apiClient().post<LoginResponse>(`/marketplace/auth/login`, payload);
  return data;
}

export const getCurrentUserApi = async (): Promise<{ user: AuthUser }> => {
  const { data } = await apiClient().get<{ user: AuthUser }>(`/marketplace/auth/me`);
  return data;
};

export const sendAccountLinkApi = async (payload: { email: string }): Promise<{ message: string }> => {
  const { data } = await apiClient().post<{ message: string }>(`/marketplace/auth/send-account-link`, payload);
  return data;
};

export const verifyAccountLinkApi = async (token: string): Promise<{ message: string; user: AuthUser }> => {
  const { data } = await apiClient().get<{ message: string; user: AuthUser }>(`/marketplace/auth/verify-account-link?token=${token}`);
  return data;
};

export const googleRegisterApi = async (payload: { code: string; redirectUri: string }): Promise<{ accessToken: string; csrfToken: string | null; user: AuthUser }> => {
  const { data } = await apiClient().post<{ accessToken: string; csrfToken: string | null; user: AuthUser }>(`/marketplace/auth/google/code/register`, payload);
  return data;
};

export const googleLoginApi = async (payload: { code: string; redirectUri: string }): Promise<{ accessToken: string; csrfToken: string | null; user: AuthUser }> => {
  const { data } = await apiClient().post<{ accessToken: string; csrfToken: string | null; user: AuthUser }>(`/marketplace/auth/google/code/login`, payload);
  return data;
};

export const linkGoogleByCodeApi = async (payload: { code: string; redirectUri: string }): Promise<{ accessToken: string; csrfToken: string | null; user: AuthUser }> => {
  const { data } = await apiClient().post<{ accessToken: string; csrfToken: string | null; user: AuthUser }>(`/marketplace/auth/link/google/by-code`, payload);
  return data;
};

export const unlinkGoogleApi = async (payload: { password: string }): Promise<{ message: string }> => {
  const { data } = await apiClient().post<{ message: string }>(`/marketplace/auth/unlink/google`, payload);
  return data;
};

export const reauthForLinkApi = async (payload: { email: string; password: string }): Promise<{ proof: string }> => {
  const { data } = await apiClient().post<{ proof: string }>(`/marketplace/auth/link/google/re-auth`, payload);
  return data;
};

export const linkGoogleApi = async (payload: { tx_id: string; proof: string }): Promise<{ accessToken: string; csrfToken: string | null; user: AuthUser }> => {
  const { data } = await apiClient().post<{ accessToken: string; csrfToken: string | null; user: AuthUser }>(`/marketplace/auth/link/google`, payload);
  return data;
};

export const verifyEmailApi = async (token: string): Promise<{ message: string; success: boolean; user: AuthUser }> => {
  const { data } = await apiClient().get<{ message: string; success: boolean; user: AuthUser }>(`/marketplace/auth/verify-email?token=${token}`);
  return data;
};
