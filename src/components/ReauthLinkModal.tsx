import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { reauthForLinkAction, closeAccountLinkingModal } from '../features/auth/actions';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Link2, X } from 'lucide-react';

interface ReauthLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReauthLinkModal = ({ isOpen, onClose }: ReauthLinkModalProps) => {
  const dispatch = useAppDispatch();
  const { linkingError, linkingLoading } = useAppSelector((state) => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');

  if (!isOpen) return null;

  // Sync Redux error state to local error for display
  useEffect(() => {
    if (linkingError) {
      setLocalError(linkingError);
    } else {
      setLocalError('');
    }
  }, [linkingError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');
    
    // Dispatch the action - errors will be handled via Redux state
    dispatch(reauthForLinkAction.request({ email, password }));
    // The saga will automatically proceed to link the Google account on success
    // On failure, linkingError will be set in Redux and displayed via useEffect above
  };

  const handleClose = () => {
    setEmail('');
    setPassword('');
    setLocalError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center relative">
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
            disabled={linkingLoading}
          >
            <X className="w-5 h-5" />
          </button>
          <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <Link2 className="w-6 h-6 text-blue-600" />
          </div>
          <CardTitle className="text-xl">Link Your Google Account</CardTitle>
          <CardDescription>
            An account with this email already exists. Enter your password to link your Google account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {localError && (
              <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                {localError}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="link-email">Email</Label>
              <Input
                id="link-email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={linkingLoading}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="link-password">Password</Label>
              <Input
                id="link-password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={linkingLoading}
                required
              />
            </div>

            <div className="flex space-x-3">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                className="flex-1"
                disabled={linkingLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700"
                disabled={linkingLoading}
              >
                {linkingLoading ? 'Verifying...' : 'Link Account'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReauthLinkModal;
