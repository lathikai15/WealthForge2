import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="bg-card shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-primary">
              PeerLend Connect
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                to="/"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === "/" 
                    ? "bg-primary text-primary-foreground" 
                    : "text-foreground hover:bg-muted"
                }`}
              >
                Role Select
              </Link>
              <Link
                to="/login"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === "/login" 
                    ? "bg-primary text-primary-foreground" 
                    : "text-foreground hover:bg-muted"
                }`}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === "/signup" 
                    ? "bg-primary text-primary-foreground" 
                    : "text-foreground hover:bg-muted"
                }`}
              >
                Signup
              </Link>
              <Link
                to="/kyc"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === "/kyc" 
                    ? "bg-primary text-primary-foreground" 
                    : "text-foreground hover:bg-muted"
                }`}
              >
                KYC
              </Link>
              <Link
                to="/investor-dashboard"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === "/investor-dashboard" 
                    ? "bg-primary text-primary-foreground" 
                    : "text-foreground hover:bg-muted"
                }`}
              >
                Investor
              </Link>
              <Link
                to="/trader-dashboard"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === "/trader-dashboard" 
                    ? "bg-primary text-primary-foreground" 
                    : "text-foreground hover:bg-muted"
                }`}
              >
                Trader
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;