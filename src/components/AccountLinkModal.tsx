import { useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { sendAccountLinkAction, closeAccountLinkModal, clearAuthErrorAction } from '../features/auth/actions';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Mail, CheckCircle, ArrowLeft, AlertCircle } from 'lucide-react';

interface AccountLinkModalProps {
  isOpen: boolean;
  userDetails: {
    firstName: string;
    lastName: string;
    email: string;
  };
  onClose: () => void;
}

const AccountLinkModal = ({ isOpen, userDetails, onClose }: AccountLinkModalProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get state from Redux
  const { accountLinkSending, accountLinkSendError, accountLinkSendSuccess } = useAppSelector((state) => state.auth);

  const isLoginFlow = location.pathname === '/login';

  if (!isOpen) return null;

  const handleConfirm = () => {
    dispatch(sendAccountLinkAction.request({ email: userDetails.email }));
  };

  const handleDeny = () => {
    onClose();
    // Clear any auth errors when closing the modal
    dispatch(clearAuthErrorAction());
    
    // Check OAuth mode to determine where to navigate
    const oauthMode = sessionStorage.getItem('oauthMode') || 'login';
    
    // For registration flow (including Google registration), navigate to register page
    if (!isLoginFlow || oauthMode === 'register') {
      // Clear OAuth session data
      sessionStorage.removeItem('oauthMode');
      sessionStorage.removeItem('oauthReturnTo');
      // Navigate to register page
      navigate('/register', { replace: true });
    } else {
      // For login, just close - user stays on login page with form intact
      // No navigation needed
    }
  };

  const handleUnderstood = () => {
    onClose();
    navigate('/');
  };

  // Determine which step to show based on Redux state
  const showSuccessStep = accountLinkSendSuccess && !accountLinkSendError;
  const showErrorStep = !!accountLinkSendError;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        {showSuccessStep ? (
          <>
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <CardTitle className="text-xl">Check Your Email</CardTitle>
              <CardDescription>
                We've sent you an invitation to enable marketplace access
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center space-y-2">
                <p className="text-sm text-gray-600">
                  We've sent an email to <strong>{userDetails.email}</strong>
                </p>
                <p className="text-sm text-gray-600">
                  Please check your email and accept the invitation to link your account. Once you accept, you'll be able to start using your customer account to browse and book services.
                </p>
              </div>
              <Button
                onClick={handleUnderstood}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                Understood
              </Button>
            </CardContent>
          </>
        ) : showErrorStep ? (
          <>
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <CardTitle className="text-xl">Unable to Send Email</CardTitle>
              <CardDescription className="text-red-600">
                {accountLinkSendError}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center space-y-2">
                <p className="text-sm text-gray-600">
                  {accountLinkSendError?.includes('already sent') || accountLinkSendError?.includes('TOO_MANY_REQUESTS')
                    ? 'Please check your email inbox for the previously sent invitation, or wait a few minutes before trying again.'
                    : 'Please try again or contact support if the problem persists.'}
                </p>
              </div>
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={handleDeny}
                  className="flex-1"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Go Back
                </Button>
                <Button
                  onClick={handleConfirm}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                  disabled={accountLinkSending}
                >
                  {accountLinkSending ? 'Sending...' : 'Try Again'}
                </Button>
              </div>
            </CardContent>
          </>
        ) : (
          <>
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle className="text-xl">Account Already Exists</CardTitle>
              <CardDescription>
                Hello {userDetails.firstName}! You already have a business account with us.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600 text-center">
                Would you like to add marketplace access to browse and book services?
              </p>
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={handleDeny}
                  className="flex-1"
                  disabled={accountLinkSending}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  No, Go Back
                </Button>
                <Button
                  onClick={handleConfirm}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                  disabled={accountLinkSending}
                >
                  {accountLinkSending ? 'Sending...' : 'Yes, Enable Access'}
                </Button>
              </div>
            </CardContent>
          </>
        )}
      </Card>
    </div>
  );
};

export default AccountLinkModal;
