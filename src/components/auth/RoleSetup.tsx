import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';
import { UserCheck, Building2 } from 'lucide-react';

interface RoleSetupProps {
  onComplete: () => void;
}

export function RoleSetup({ onComplete }: RoleSetupProps) {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleRoleSelection = async (role: 'student' | 'sponsor') => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role })
        .eq('user_id', user.id);

      if (error) throw error;

      localStorage.removeItem('needs_role_setup');
      toast({
        title: "Profile updated",
        description: `Welcome! You're now registered as a ${role}.`,
      });
      onComplete();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update your profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>Welcome to CampusConnect!</CardTitle>
          <CardDescription>
            Let us know your role to personalize your experience
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={() => handleRoleSelection('student')}
            disabled={loading}
            variant="outline"
            size="lg"
            className="w-full h-16 flex items-center gap-3"
          >
            <UserCheck className="h-6 w-6" />
            <div className="text-left">
              <div className="font-semibold">Student</div>
              <div className="text-sm text-muted-foreground">
                Host events and find sponsors
              </div>
            </div>
          </Button>
          
          <Button
            onClick={() => handleRoleSelection('sponsor')}
            disabled={loading}
            variant="outline"
            size="lg"
            className="w-full h-16 flex items-center gap-3"
          >
            <Building2 className="h-6 w-6" />
            <div className="text-left">
              <div className="font-semibold">Sponsor</div>
              <div className="text-sm text-muted-foreground">
                Support student initiatives
              </div>
            </div>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}