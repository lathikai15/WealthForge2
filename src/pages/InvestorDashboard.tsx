import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Trader {
  id: string;
  name: string;
  commission: number;
  profitHistory: string;
  tradingAccount: string;
  verified: boolean;
  totalProfit: number;
  experience: string;
}

const InvestorDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [traders, setTraders] = useState<Trader[]>([
    {
      id: "1",
      name: "Alex Kumar",
      commission: 15,
      profitHistory: "85% success rate over 2 years",
      tradingAccount: "https://tradingview.com/alex-kumar",
      verified: true,
      totalProfit: 245000,
      experience: "Specializes in day trading and crypto"
    },
    {
      id: "2",
      name: "Sarah Chen", 
      commission: 12,
      profitHistory: "92% success rate over 3 years",
      tradingAccount: "https://tradingview.com/sarah-chen",
      verified: true,
      totalProfit: 380000,
      experience: "Expert in forex and commodities"
    },
    {
      id: "3",
      name: "Raj Patel",
      commission: 18,
      profitHistory: "78% success rate over 1.5 years", 
      tradingAccount: "https://tradingview.com/raj-patel",
      verified: true,
      totalProfit: 156000,
      experience: "Focus on swing trading and options"
    }
  ]);

  const filteredTraders = traders.filter(trader =>
    trader.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trader.commission.toString().includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header Stats */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Total Invested (Last Month)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">₹2,45,000</div>
              <p className="text-sm text-muted-foreground">+12% from previous month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Profit Earned (Last Month)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-success">₹36,750</div>
              <p className="text-sm text-muted-foreground">15% average return</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Traders List */}
        <Card>
          <CardHeader>
            <CardTitle>Available Traders</CardTitle>
            <CardDescription>
              Search and connect with verified traders
            </CardDescription>
            <div className="pt-4">
              <Input
                placeholder="Search by trader name or commission rate..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-md"
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {filteredTraders.map((trader) => (
                <Card key={trader.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold">{trader.name}</h3>
                          {trader.verified && (
                            <Badge variant="secondary" className="text-xs">
                              ✓ Verified
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {trader.experience}
                        </p>
                        <p className="text-sm text-muted-foreground mb-2">
                          {trader.profitHistory}
                        </p>
                        <div className="flex flex-wrap gap-4 text-sm">
                          <span className="text-success font-medium">
                            Total Profits: ₹{trader.totalProfit.toLocaleString()}
                          </span>
                          <span className="text-primary font-medium">
                            Commission: {trader.commission}%
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button variant="outline" size="sm">
                          View Trading Account
                        </Button>
                        <Button size="sm">
                          Invest with {trader.name}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {filteredTraders.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No traders found matching your search criteria.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InvestorDashboard;