import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { supabase } from "./supabaseClient";
import PhoneVerification from "./pages/PhoneVerification";
import RoleSelect from "./pages/RoleSelect";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import KYC from "./pages/KYC";
import InvestorBank from "./pages/InvestorBank";
import InvestorDashboard from "./pages/InvestorDashboard";
import TraderBank from "./pages/TraderBank";
import TraderDashboard from "./pages/TraderDashboard";
import Navbar from "./components/Navbar";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get current session
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setLoading(false);
    });

    // Listen for login/logout
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Navbar />
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<RoleSelect />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />

            {/* Protected routes */}
            <Route
              path="/kyc"
              element={user ? <KYC /> : <Navigate to="/login" />}
            />
            <Route
              path="/investor-bank"
              element={user ? <InvestorBank /> : <Navigate to="/login" />}
            />
            <Route
              path="/investor-dashboard"
              element={user ? <InvestorDashboard /> : <Navigate to="/login" />}
            />
            <Route
              path="/trader-bank"
              element={user ? <TraderBank /> : <Navigate to="/login" />}
            />
            <Route
              path="/trader-dashboard"
              element={user ? <TraderDashboard /> : <Navigate to="/login" />}
            />
            <Route
              path="/phone-verification"
              element={user ? <PhoneVerification /> : <Navigate to="/login" />}
            />
            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
