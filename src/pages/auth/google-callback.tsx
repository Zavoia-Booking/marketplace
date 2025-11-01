import { useEffect, useState, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { googleAuthAction, linkGoogleByCodeAction } from '../../features/auth/actions';
import { getGoogleRedirectUri } from '../../lib/googleAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '../../components/ui/button';

const GoogleCallbackPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { error, isAuthenticated, isLoading, isAccountLinkingModalOpen, isAccountLinkModalOpen } = useAppSelector((state) => state.auth);
  const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');
  const [errorMessage, setErrorMessage] = useState('');
  const hasInitiated = useRef(false);
  const modalWasOpenRef = useRef(false);

  useEffect(() => {
    // Prevent double execution
    if (hasInitiated.current) {
      return;
    }

    const code = searchParams.get('code');
    const errorParam = searchParams.get('error');

    if (errorParam) {
      setErrorMessage('Google authentication was cancelled or failed');
      setStatus('error');
      hasInitiated.current = true;
      return;
    }

    if (!code) {
      setErrorMessage('No authorization code received from Google');
      setStatus('error');
      hasInitiated.current = true;
      return;
    }

    // Mark as initiated to prevent double execution
    hasInitiated.current = true;

    // Get the OAuth mode from sessionStorage
    const mode = sessionStorage.getItem('oauthMode') || 'login';
    const redirectUri = getGoogleRedirectUri();

    if (mode === 'link') {
      // Linking from settings page
      dispatch(linkGoogleByCodeAction.request({ code, redirectUri }));
    } else {
      // Login or register flow
      dispatch(googleAuthAction.request({ code, redirectUri }));
    }
  }, [dispatch, searchParams]);

  // Track modal state to detect when it closes
  useEffect(() => {
    if (isAccountLinkingModalOpen) {
      modalWasOpenRef.current = true;
    } else if (modalWasOpenRef.current && !isAuthenticated) {
      // Modal was open and is now closed - user cancelled the linking process
      // Redirect based on OAuth mode
      const mode = sessionStorage.getItem('oauthMode') || 'login';
      const timeoutId = setTimeout(() => {
        // Mark as completed to prevent further processing
        hasInitiated.current = false;
        modalWasOpenRef.current = false;
        sessionStorage.removeItem('oauthMode');
        sessionStorage.removeItem('oauthReturnTo');
        sessionStorage.removeItem('linkContext');
        
        // Navigate based on mode
        if (mode === 'register') {
          navigate('/register', { replace: true });
        } else {
          navigate('/login', { replace: true });
        }
      }, 300);
      
      return () => clearTimeout(timeoutId);
    }
  }, [isAccountLinkingModalOpen, isAuthenticated, navigate]);

  // Monitor Redux state for success/error
  useEffect(() => {
    if (!hasInitiated.current) return;

    // Check for errors first
    if (error && status === 'processing') {
      // If account_not_found, redirect to login page to show error there
      if (error.includes('No account found') || error.includes('account_not_found') || error.includes('Please register first')) {
        const mode = sessionStorage.getItem('oauthMode') || 'login';
        if (mode === 'login') {
          // Redirect to login page where the error will be displayed
          sessionStorage.removeItem('oauthMode');
          sessionStorage.removeItem('oauthReturnTo');
          navigate('/login', { replace: true });
          return;
        }
      }
      
      setErrorMessage(error);
      setStatus('error');
      return;
    }

    // Check for success (authenticated and not loading)
    if (isAuthenticated && !isLoading && status === 'processing') {
      setStatus('success');
      modalWasOpenRef.current = false; // Reset modal tracking on success
      
      // Redirect after a brief moment to show success
      const mode = sessionStorage.getItem('oauthMode') || 'login';
      if (mode !== 'link') {
        setTimeout(() => {
          let returnTo = sessionStorage.getItem('oauthReturnTo') || '/';
          
          // Don't redirect back to auth pages after successful login
          if (returnTo === '/login' || returnTo === '/register' || returnTo.startsWith('/auth/')) {
            returnTo = '/';
          }
          
          sessionStorage.removeItem('oauthMode');
          sessionStorage.removeItem('oauthReturnTo');
          navigate(returnTo, { replace: true });
        }, 500);
      }
    }
  }, [error, isAuthenticated, isLoading, status, navigate, isAccountLinkingModalOpen]);


  // Don't render the callback screen if modals are open
  if (isAccountLinkModalOpen || isAccountLinkingModalOpen) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          {status === 'processing' && (
            <>
              <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
              </div>
              <CardTitle className="text-xl">Completing Sign In</CardTitle>
              <CardDescription>
                Please wait while we authenticate with Google...
              </CardDescription>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <CardTitle className="text-xl">Success!</CardTitle>
              <CardDescription>
                You've been signed in with Google
              </CardDescription>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
              <CardTitle className="text-xl">Authentication Failed</CardTitle>
              <CardDescription>
                {errorMessage || error || 'Something went wrong'}
              </CardDescription>
            </>
          )}
        </CardHeader>

        <CardContent>
          {status === 'processing' && (
            <p className="text-center text-sm text-gray-600">
              This should only take a moment...
            </p>
          )}

          {status === 'success' && (
            <p className="text-center text-sm text-gray-600">
              Redirecting you now...
            </p>
          )}

          {status === 'error' && (
            <div className="space-y-4">
              <p className="text-center text-sm text-gray-600">
                Please try again or use a different sign-in method.
              </p>
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={() => navigate('/login')}
                  className="flex-1"
                >
                  Try Again
                </Button>
                <Button
                  onClick={() => navigate('/')}
                  className="flex-1"
                >
                  Go Home
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default GoogleCallbackPage;
