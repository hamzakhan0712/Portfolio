import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft, Search } from "lucide-react";
import { Background } from "@/components/background";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen relative overflow-hidden transition-theme">
      {/* Background */}
      <div className="fixed inset-0 w-full h-full -z-30">
        <Background />
      </div>

      {/* Content */}
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-2xl w-full text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {/* 404 Display */}
          <div className="relative">
            <h1 className="text-9xl md:text-[12rem] font-bold text-primary/10 select-none">
              404
            </h1>
            
          </div>

          {/* Message */}
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground">
              Page Not Found
            </h2>
            <p className="text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => navigate(-1)}
              className="group flex items-center gap-2 px-6 py-3 rounded-lg border border-border hover:border-primary bg-card hover:bg-card/80 text-foreground transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
              <span>Go Back</span>
            </button>

            <button
              onClick={() => navigate("/")}
              className="group flex items-center gap-2 px-6 py-3 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-primary/25"
            >
              <Home className="w-5 h-5" />
              <span>Back to Home</span>
            </button>
          </div>

          {/* Additional Info */}
          <div className="pt-8">
            <p className="text-sm text-muted-foreground">
              Error Code: 404 | Path:{" "}
              <code className="px-2 py-1 rounded bg-muted text-foreground font-mono text-xs">
                {location.pathname}
              </code>
            </p>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="circle-bg w-96 h-96 bg-primary/30 -top-48 -left-48" />
      <div className="circle-bg w-96 h-96 bg-primary/20 -bottom-48 -right-48" />
    </div>
  );
};

export default NotFound;