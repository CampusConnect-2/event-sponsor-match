import { ReactNode } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AuthGateProps {
  children: ReactNode;
  fallback?: ReactNode;
  showModal?: boolean;
  onModalClose?: () => void;
}

export function AuthGate({ children, fallback, showModal = false, onModalClose }: AuthGateProps) {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    if (showModal) {
      return (
        <Dialog open={showModal} onOpenChange={onModalClose}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <LogIn className="h-5 w-5" />
                Please sign in
              </DialogTitle>
              <DialogDescription>
                You need to be signed in to access this feature.
              </DialogDescription>
            </DialogHeader>
            <div className="flex gap-2 pt-4">
              <Button 
                onClick={() => navigate('/auth')}
                className="flex-1"
              >
                Sign in
              </Button>
              <Button 
                variant="outline" 
                onClick={onModalClose}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      );
    }

    return fallback || (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-4">
        <LogIn className="h-12 w-12 text-muted-foreground" />
        <div>
          <h3 className="text-lg font-semibold">Authentication Required</h3>
          <p className="text-muted-foreground">Please sign in to access this page.</p>
        </div>
        <Button onClick={() => navigate('/auth')}>
          Sign in
        </Button>
      </div>
    );
  }

  return <>{children}</>;
}