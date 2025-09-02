import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const RoleSelect = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role: 'investor' | 'trader') => {
    localStorage.setItem('selectedRole', role);
    navigate('/login'); // Go to login after role selection
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Welcome to PeerLend Connect</h1>
          <p className="text-lg text-muted-foreground">Connect traders with investors for profitable partnerships</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl">I am an Investor</CardTitle>
              <CardDescription>Fund profitable trades and earn returns</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <Button onClick={() => handleRoleSelect('investor')} className="w-full" size="lg">
                Continue as Investor
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl">I am a Trader</CardTitle>
              <CardDescription>Get funding from investors to scale trading</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <Button onClick={() => handleRoleSelect('trader')} variant="success" className="w-full" size="lg">
                Continue as Trader
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RoleSelect;
