import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "../supabaseClient"; // 👈 add this import

const KYC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    dateOfBirth: "",
    phoneNumber: "",
    otp: "",
    emailVerified: false,
    govtIdType: "",
    govtIdNumber: "",
  });

  const [otpSent, setOtpSent] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [status, setStatus] = useState("");

  // Send OTP via backend
  const sendOTP = async () => {
    if (!formData.phoneNumber) return setStatus("Enter phone number first");

    try {
      const res = await fetch("http://localhost:5000/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: formData.phoneNumber }),
      });
      const data = await res.json();

      if (data.Status === "Success") {
        setSessionId(data.Details);
        setOtpSent(true);
        setStatus("OTP sent successfully!");
      } else {
        setStatus("Failed to send OTP. Try again.");
      }
    } catch (err) {
      setStatus("Error sending OTP");
      console.error(err);
    }
  };

  // Verify OTP via backend
  const verifyOTP = async () => {
    if (!formData.otp) return setStatus("Enter OTP first");
    try {
      const res = await fetch("http://localhost:5000/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, otp: formData.otp }),
      });
      const data = await res.json();

      if (data.Status === "Success") {
        setOtpVerified(true);
        setStatus("Phone verified successfully!");
      } else {
        setStatus("OTP mismatch. Try again.");
      }
    } catch (err) {
      setStatus("Error verifying OTP");
      console.error(err);
    }
  };

  // Simulate email verification
  const verifyEmail = () => setFormData({ ...formData, emailVerified: true });

  // Submit KYC
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!otpVerified) return setStatus("Verify phone first");
    if (!formData.emailVerified) return setStatus("Verify email first");

    try {
      // 👇 get current logged-in user
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        console.error(userError.message);
        return setStatus("Error fetching user: " + userError.message);
      }
      if (!user) {
        return setStatus("Not logged in");
      }

      // 👇 insert into user_kyc table
      const { error } = await supabase.from("user_kyc").insert([
        {
          user_id: user.id,
          full_name: formData.fullName,
          email: formData.email,
          dob: formData.dateOfBirth,
          govt_id_type: formData.govtIdType,
          govt_id_number: formData.govtIdNumber,
          phone_number: formData.phoneNumber,
          is_email_verified: formData.emailVerified,
        },
      ]);

      if (error) {
        console.error("Insert error:", error.message);
        return setStatus("Error saving KYC: " + error.message);
      }

      setStatus("✅ KYC Saved!");

      // Navigate based on role
      const selectedRole = localStorage.getItem("selectedRole");
      if (selectedRole === "investor") {
        navigate("/investor-bank");
      } else if (selectedRole === "trader") {
        navigate("/trader-bank");
      } else {
        navigate("/investor-bank");
      }
    } catch (err: any) {
      console.error(err);
      setStatus("Unexpected error: " + err.message);
    }
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
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                required
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            {/* DOB */}
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                required
              />
            </div>

            {/* Government ID */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="govtIdType">Government ID Type</Label>
                <Select
                  value={formData.govtIdType}
                  onValueChange={(value) => setFormData({ ...formData, govtIdType: value })}
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
                  onChange={(e) => setFormData({ ...formData, govtIdNumber: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* Phone + OTP */}
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <div className="flex space-x-2">
                <Input
                  id="phoneNumber"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  required
                />
                <Button type="button" variant="outline" onClick={sendOTP} disabled={otpSent}>
                  {otpSent ? "Sent" : "Send OTP"}
                </Button>
              </div>
            </div>

            {otpSent && !otpVerified && (
              <div className="space-y-2">
                <Label htmlFor="otp">Enter OTP</Label>
                <div className="flex space-x-2">
                  <Input
                    id="otp"
                    type="text"
                    placeholder="Enter OTP"
                    maxLength={6}
                    value={formData.otp}
                    onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                  />
                  <Button type="button" variant="outline" onClick={verifyOTP}>
                    Verify OTP
                  </Button>
                </div>
              </div>
            )}

            {/* Email Verification */}
            <div className="space-y-2">
              <Label>Email Verification</Label>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">
                  {formData.emailVerified ? "✓ Email Verified" : "Email not verified"}
                </span>
                {!formData.emailVerified && (
                  <Button type="button" variant="outline" size="sm" onClick={verifyEmail}>
                    Verify Email
                  </Button>
                )}
              </div>
            </div>

            {/* Status */}
            {status && <p className="text-center text-sm">{status}</p>}

            {/* Submit */}
            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={
                !otpVerified ||
                !formData.otp ||
                !formData.emailVerified ||
                !formData.govtIdType ||
                !formData.govtIdNumber
              }
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
