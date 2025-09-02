import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "../supabaseClient"; // 👈 import supabase client

const InvestorBank = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    accountNumber: "",
    ifscCode: "",
    bankName: "",
    accountHolderName: "",
  });

  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // 👇 get logged-in user
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

      // 👇 insert bank details
      const { error } = await supabase.from("bank_details").insert([
        {
          user_id: user.id,
          account_holder_name: formData.accountHolderName,
          account_number: formData.accountNumber,
          ifsc_code: formData.ifscCode,
          bank_name: formData.bankName,
        },
      ]);

      if (error) {
        console.error("Insert error:", error.message);
        return setStatus("Error saving bank details: " + error.message);
      }

      setStatus("✅ Bank details saved!");

      // navigate after saving
      navigate("/investor-dashboard");
    } catch (err: any) {
      console.error(err);
      setStatus("Unexpected error: " + err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Bank Account Details</CardTitle>
          <CardDescription className="text-center">
            Add your bank account for secure transactions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="accountHolderName">Account Holder Name</Label>
              <Input
                id="accountHolderName"
                type="text"
                placeholder="Enter account holder name"
                value={formData.accountHolderName}
                onChange={(e) => setFormData({ ...formData, accountHolderName: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="accountNumber">Account Number</Label>
              <Input
                id="accountNumber"
                type="text"
                placeholder="Enter your account number"
                value={formData.accountNumber}
                onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ifscCode">IFSC Code</Label>
              <Input
                id="ifscCode"
                type="text"
                placeholder="Enter IFSC code"
                value={formData.ifscCode}
                onChange={(e) => setFormData({ ...formData, ifscCode: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bankName">Bank Name</Label>
              <Input
                id="bankName"
                type="text"
                placeholder="Enter your bank name"
                value={formData.bankName}
                onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                required
              />
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-medium text-sm mb-2">Security Notice</h3>
              <p className="text-sm text-muted-foreground">
                Your bank details are encrypted and stored securely. We use bank-level security to
                protect your information.
              </p>
            </div>

            {status && <p className="text-center text-sm">{status}</p>}

            <Button type="submit" className="w-full" size="lg">
              Verify Bank Account
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvestorBank;
