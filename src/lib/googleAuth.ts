/**
 * Google OAuth Configuration and Utilities
 */

// Google OAuth Client ID should be set in environment variables
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

// OAuth redirect URIs
export const getGoogleAuthUrl = (mode: 'login' | 'register' | 'link' = 'login'): string => {
  const redirectUri = `${window.location.origin}/auth/callback`;
  
  // Store mode in sessionStorage to retrieve after redirect
  try {
    sessionStorage.setItem('oauthMode', mode);
    
    // Don't store auth pages as return URL - use home instead
    const currentPath = window.location.pathname;
    const returnTo = (currentPath === '/login' || currentPath === '/register' || currentPath.startsWith('/auth/')) 
      ? '/' 
      : currentPath;
    
    sessionStorage.setItem('oauthReturnTo', returnTo);
  } catch (e) {
    console.error('Failed to store OAuth state:', e);
  }

  const params = new URLSearchParams({
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: 'openid email profile',
    access_type: 'offline',
    prompt: 'consent',
  });

  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
};

export const getGoogleRedirectUri = (): string => {
  return `${window.location.origin}/auth/callback`;
};

export const getGoogleClientId = (): string => {
  return GOOGLE_CLIENT_ID;
};

export const isGoogleConfigured = (): boolean => {
  return !!GOOGLE_CLIENT_ID && GOOGLE_CLIENT_ID !== '';
};

