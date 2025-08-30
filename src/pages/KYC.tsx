import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const KYC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    phoneNumber: "",
    otp: "",
    emailVerified: false,
    govtIdType: "",
    govtIdNumber: ""
  });
  const [otpSent, setOtpSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedRole = localStorage.getItem('selectedRole');
    
    if (selectedRole === 'investor') {
      navigate('/investor-bank');
    } else if (selectedRole === 'trader') {
      navigate('/trader-bank');
    } else {
      navigate('/investor-bank');
    }
  };

  const sendOTP = () => {
    // Simulate OTP sending
    setOtpSent(true);
  };

  const verifyEmail = () => {
    // Simulate email verification
    setFormData({...formData, emailVerified: true});
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">KYC Verification</CardTitle>
          <CardDescription className="text-center">
            Complete your verification to continue
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="govtIdType">Government ID Type</Label>
                <Select
                  value={formData.govtIdType}
                  onValueChange={(value) => setFormData({...formData, govtIdType: value})}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select ID type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="aadhar">Aadhar Card</SelectItem>
                    <SelectItem value="pan">PAN Card</SelectItem>
                    <SelectItem value="passport">Passport</SelectItem>
                    <SelectItem value="driving-license">Driving License</SelectItem>
                    <SelectItem value="voter-id">Voter ID</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="govtIdNumber">ID Number</Label>
                <Input
                  id="govtIdNumber"
                  type="text"
                  placeholder="Enter ID number"
                  value={formData.govtIdNumber}
                  onChange={(e) => setFormData({...formData, govtIdNumber: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <div className="flex space-x-2">
                <Input
                  id="phoneNumber"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                  required
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={sendOTP}
                  disabled={otpSent}
                >
                  {otpSent ? "Sent" : "Send OTP"}
                </Button>
              </div>
            </div>

            {otpSent && (
              <div className="space-y-2">
                <Label htmlFor="otp">Enter OTP</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  maxLength={6}
                  value={formData.otp}
                  onChange={(e) => setFormData({...formData, otp: e.target.value})}
                  required
                />
              </div>
            )}

            <div className="space-y-2">
              <Label>Email Verification</Label>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">
                  {formData.emailVerified ? "✓ Email Verified" : "Email not verified"}
                </span>
                {!formData.emailVerified && (
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={verifyEmail}
                  >
                    Verify Email
                  </Button>
                )}
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              size="lg"
              disabled={!otpSent || !formData.otp || !formData.emailVerified || !formData.govtIdType || !formData.govtIdNumber}
            >
              Complete Verification
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default KYC;