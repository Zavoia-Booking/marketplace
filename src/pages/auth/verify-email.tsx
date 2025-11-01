import { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { verifyEmailAction } from '../../features/auth/actions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

const VerifyEmailPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { emailVerifying, emailVerifyError, emailVerifySuccess } = useAppSelector((state) => state.auth);
  const hasInitiated = useRef(false);

  const token = searchParams.get('token');

  useEffect(() => {
    if (hasInitiated.current) return;
    
    if (!token) {
      hasInitiated.current = true;
      return;
    }

    // Automatically verify the email
    dispatch(verifyEmailAction.request({ token }));
    hasInitiated.current = true;
  }, [token, dispatch]);

  // Determine status from Redux state
  const status: 'verifying' | 'success' | 'error' = 
    !token ? 'error' :
    !hasInitiated.current ? 'verifying' :
    emailVerifySuccess ? 'success' :
    emailVerifyError ? 'error' :
    emailVerifying ? 'verifying' :
    'error';
  
  const displayError = !token 
    ? 'Verification token is required.' 
    : emailVerifyError || 'The verification link is invalid or has expired.';

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
              <CardTitle className="text-xl">Verifying Email</CardTitle>
              <CardDescription>
                Please wait while we verify your email address...
              </CardDescription>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <CardTitle className="text-xl">Email Verified Successfully!</CardTitle>
              <CardDescription>
                Your email address has been verified. You can now use all features of your account.
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
                {displayError}
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
                Your account is now fully verified and ready to use.
              </p>
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={handleGoHome}
                  className="flex-1"
                >
                  Home
                </Button>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="text-center space-y-4">
              <p className="text-sm text-gray-600">
                {displayError?.includes('already verified')
                  ? 'This email address has already been verified. You can proceed to log in.'
                  : displayError?.includes('token is required')
                  ? 'Please use the verification link from your email.'
                  : 'Please check the verification link or request a new one if it has expired.'}
              </p>
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={handleGoHome}
                  className="flex-1"
                >
                  Home
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyEmailPage;

