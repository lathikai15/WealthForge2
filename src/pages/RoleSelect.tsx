import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const RoleSelect = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role: 'investor' | 'trader') => {
    localStorage.setItem('selectedRole', role);
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Welcome to PeerLend Connect
          </h1>
          <p className="text-lg text-muted-foreground">
            Connect traders with investors for profitable partnerships
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <CardTitle className="text-2xl">I am an Investor</CardTitle>
              <CardDescription className="text-base">
                Fund profitable trades and earn returns on your investments
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                <li>• Browse verified traders</li>
                <li>• View trading performance</li>
                <li>• Invest with confidence</li>
                <li>• Track your returns</li>
              </ul>
              <Button 
                onClick={() => handleRoleSelect('investor')}
                className="w-full"
                size="lg"
              >
                Continue as Investor
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <CardTitle className="text-2xl">I am a Trader</CardTitle>
              <CardDescription className="text-base">
                Get funding from investors to scale your trading operations
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                <li>• Access investor funding</li>
                <li>• Set your commission rates</li>
                <li>• Share your track record</li>
                <li>• Scale your trading</li>
              </ul>
              <Button 
                onClick={() => handleRoleSelect('trader')}
                variant="success"
                className="w-full"
                size="lg"
              >
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