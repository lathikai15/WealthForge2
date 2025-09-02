import { useState } from "react";

const PhoneVerification = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [status, setStatus] = useState("");

  const sendOtp = async () => {
    const res = await fetch("http://localhost:5000/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone }),
    });
    const data = await res.json();
    if (data.Status === "Success") {
      setSessionId(data.Details);
      setStatus("OTP sent! Check your phone.");
    } else {
      setStatus("Failed to send OTP.");
    }
  };

  const verifyOtp = async () => {
    const res = await fetch("http://localhost:5000/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId, otp }),
    });
    const data = await res.json();
    if (data.Status === "Success") {
      setStatus("Phone verified successfully!");
      // Here you can mark user as verified in your Supabase profile
    } else {
      setStatus("OTP mismatch. Try again.");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Phone Verification</h2>
      <input
        type="text"
        placeholder="Enter phone number with country code"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <button onClick={sendOtp}>Send OTP</button>
      <br /><br />
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button onClick={verifyOtp}>Verify OTP</button>
      <p>{status}</p>
    </div>
  );
};

export default PhoneVerification;
