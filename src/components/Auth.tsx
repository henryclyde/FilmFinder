import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Chrome } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AuthProps {
  onSignIn?: () => void;
}

export function Auth({ onSignIn }: AuthProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // This would normally connect to a backend
    setTimeout(() => {
      toast({
        title: "Signed in successfully",
        description: "Welcome back!"
      });
      setIsLoading(false);
      if (onSignIn) onSignIn();
    }, 1000);
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    
    // This would normally connect to a Google auth provider
    setTimeout(() => {
      toast({
        title: "Signed in with Google",
        description: "Welcome to MovieVibes!"
      });
      setIsLoading(false);
      if (onSignIn) onSignIn();
    }, 1000);
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 sm:p-6 space-y-6 bg-card rounded-lg shadow-lg animate-fade-up">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Welcome to MovieVibes</h2>
        <p className="text-muted-foreground mt-2">Sign in to manage your watch list</p>
      </div>
      
      <Button 
        className="w-full" 
        variant="outline" 
        onClick={handleGoogleSignIn}
        disabled={isLoading}
      >
        <Chrome className="mr-2 h-4 w-4" />
        Sign in with Google
      </Button>
      
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      
      <Tabs defaultValue="sign-in" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="sign-in">Sign In</TabsTrigger>
          <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
        </TabsList>
        
        <TabsContent value="sign-in">
          <form onSubmit={handleEmailSignIn} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </TabsContent>
        
        <TabsContent value="sign-up">
          <form onSubmit={handleEmailSignIn} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="signup-email">Email</Label>
              <Input
                id="signup-email"
                type="email"
                placeholder="example@email.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="signup-password">Password</Label>
              <Input
                id="signup-password"
                type="password"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                type="password"
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Auth;
