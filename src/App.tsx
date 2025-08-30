import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<RoleSelect />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/kyc" element={<KYC />} />
            <Route path="/investor-bank" element={<InvestorBank />} />
            <Route path="/investor-dashboard" element={<InvestorDashboard />} />
            <Route path="/trader-bank" element={<TraderBank />} />
            <Route path="/trader-dashboard" element={<TraderDashboard />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
