import { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { verifyAccountLinkAction } from '../../features/auth/actions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

const VerifyAccountLinkPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { accountLinkVerifying, accountLinkVerifyError, accountLinkVerifySuccess } = useAppSelector((state) => state.auth);
  const hasInitiated = useRef(false);

  const token = searchParams.get('token');

  useEffect(() => {
    if (hasInitiated.current) return;
    
    if (!token) {
      hasInitiated.current = true;
      return;
    }

    // Automatically verify the account link
    dispatch(verifyAccountLinkAction.request({ token }));
    hasInitiated.current = true;
  }, [token, dispatch]);

  // Determine status from Redux state
  // Use specific verify account link state instead of general error/auth
  const status: 'verifying' | 'success' | 'error' = 
    !token ? 'error' :
    !hasInitiated.current ? 'verifying' :
    accountLinkVerifying ? 'verifying' :
    accountLinkVerifyError ? 'error' :
    accountLinkVerifySuccess ? 'success' :
    'verifying';
  
  const errorMessage = accountLinkVerifyError;

  const handleGoHome = () => {
    navigate('/', { replace: true });
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          {status === 'verifying' && (
            <>
              <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
              </div>
              <CardTitle className="text-xl">Verifying Account Link</CardTitle>
              <CardDescription>
                Please wait while we link your account...
              </CardDescription>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <CardTitle className="text-xl">Account Linked Successfully!</CardTitle>
              <CardDescription>
                Your account has been linked, you can now log in.
              </CardDescription>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
              <CardTitle className="text-xl">Verification Failed</CardTitle>
              <CardDescription className="text-red-600">
                {errorMessage || 'The verification link is invalid or has expired.'}
              </CardDescription>
            </>
          )}
        </CardHeader>

        <CardContent className="space-y-4">
          {status === 'verifying' && (
            <div className="text-center">
              <p className="text-sm text-gray-600">
                This may take a few moments...
              </p>
            </div>
          )}

          {status === 'success' && (
            <div className="text-center space-y-4">
              <p className="text-sm text-gray-600">
                Marketplace access enabled successfully! You can now browse and book services on our marketplace.
              </p>
              <Button
                onClick={handleGoHome}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                Home
              </Button>
            </div>
          )}

          {status === 'error' && (
            <div className="text-center space-y-4">
              <p className="text-sm text-gray-600">
                {errorMessage?.includes('already been used')
                  ? 'This verification link has already been used. If you\'re already logged in, you can start using the marketplace. If not, please log in with your credentials.'
                  : 'Please check the verification link or contact support if the problem persists.'}
              </p>
              <div className="flex space-x-3">
                {errorMessage?.includes('already been used') ? (
                  <>
                    <Button
                      onClick={handleGoHome}
                      className="flex-1"
                    >
                      Home
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      onClick={() => navigate('/register', { replace: true })}
                      className="flex-1"
                    >
                      Try Again
                    </Button>
                    <Button
                      onClick={handleGoHome}
                      className="flex-1"
                    >
                      Home
                    </Button>
                  </>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyAccountLinkPage;
