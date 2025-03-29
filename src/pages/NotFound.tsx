
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { Home } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent mb-6">
            404
          </h1>
          <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
          <p className="text-foreground/70 mb-8">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
          <Button asChild size="lg">
            <Link to="/" className="flex items-center">
              <Home className="mr-2 h-4 w-4" /> Back to Home
            </Link>
          </Button>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
