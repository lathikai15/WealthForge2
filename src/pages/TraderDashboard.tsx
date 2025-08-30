import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface TraderExperience {
  id: string;
  name: string;
  phone: string;
  tradingAccount: string;
  previousProfits: string;
  commission: number;
  description: string;
}

const TraderDashboard = () => {
  const [experiences, setExperiences] = useState<TraderExperience[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    tradingAccount: "",
    previousProfits: "",
    commission: "",
    description: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newExperience: TraderExperience = {
      id: Date.now().toString(),
      name: formData.name,
      phone: formData.phone,
      tradingAccount: formData.tradingAccount,
      previousProfits: formData.previousProfits,
      commission: parseFloat(formData.commission),
      description: formData.description
    };
    
    setExperiences([...experiences, newExperience]);
    setFormData({
      name: "",
      phone: "",
      tradingAccount: "",
      previousProfits: "",
      commission: "",
      description: ""
    });
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Total Profits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-success">₹4,85,000</div>
              <p className="text-sm text-muted-foreground">All time earnings</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Active Investors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">12</div>
              <p className="text-sm text-muted-foreground">Currently funding your trades</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Success Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-accent">87%</div>
              <p className="text-sm text-muted-foreground">Profitable trades</p>
            </CardContent>
          </Card>
        </div>

        {/* Add Experience Section */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Trading Experience</CardTitle>
                <CardDescription>
                  Add your trading experience to attract investors
                </CardDescription>
              </div>
              <Button 
                onClick={() => setShowForm(!showForm)}
                variant={showForm ? "outline" : "default"}
              >
                {showForm ? "Cancel" : "Add Experience"}
              </Button>
            </div>
          </CardHeader>
          
          {showForm && (
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tradingAccount">Trading Account Link</Label>
                  <Input
                    id="tradingAccount"
                    type="url"
                    placeholder="https://tradingview.com/your-profile"
                    value={formData.tradingAccount}
                    onChange={(e) => setFormData({...formData, tradingAccount: e.target.value})}
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="previousProfits">Previous Profits</Label>
                    <Input
                      id="previousProfits"
                      placeholder="e.g., ₹2,50,000 in last 6 months"
                      value={formData.previousProfits}
                      onChange={(e) => setFormData({...formData, previousProfits: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="commission">Commission Percentage</Label>
                    <Input
                      id="commission"
                      type="number"
                      min="1"
                      max="50"
                      placeholder="15"
                      value={formData.commission}
                      onChange={(e) => setFormData({...formData, commission: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Trading Strategy Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your trading strategy, experience, and specialization..."
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    required
                  />
                </div>

                <Button type="submit" variant="success" className="w-full" size="lg">
                  Add Experience
                </Button>
              </form>
            </CardContent>
          )}
        </Card>

        {/* Experience Cards */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Your Trading Profiles</h3>
          {experiences.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-8 text-muted-foreground">
                  No trading experiences added yet. Add your first experience to start attracting investors.
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {experiences.map((experience) => (
                <Card key={experience.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row md:justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold mb-2">{experience.name}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{experience.description}</p>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Phone:</span> {experience.phone}
                          </div>
                          <div>
                            <span className="font-medium">Commission:</span> {experience.commission}%
                          </div>
                          <div>
                            <span className="font-medium">Previous Profits:</span> {experience.previousProfits}
                          </div>
                          <div>
                            <span className="font-medium">Trading Account:</span>
                            <a 
                              href={experience.tradingAccount} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-primary hover:underline ml-1"
                            >
                              View Profile
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => setExperiences(experiences.filter(exp => exp.id !== experience.id))}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TraderDashboard;