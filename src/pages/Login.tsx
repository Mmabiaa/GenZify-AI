
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { LogIn, Github, UserPlus } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Login() {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Login functionality not implemented",
      description: "This is a demo without backend authentication yet.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md p-8 space-y-8 bg-background border border-border rounded-xl shadow-sm">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Welcome back</h1>
            <p className="text-sm text-foreground/70 mt-2">
              Sign in to your account to continue
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="your@email.com" type="email" required />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link to="/forgot-password" className="text-xs text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input id="password" placeholder="••••••••" type="password" required />
            </div>
            
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
              <LogIn className="w-4 h-4 mr-2" /> Sign In
            </Button>
          </form>
          
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="px-2 bg-background text-foreground/50">Or continue with</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-3">
            <Button variant="outline" type="button" className="w-full">
              <Github className="w-4 h-4 mr-2" /> GitHub
            </Button>
          </div>
          
          <div className="text-center text-sm">
            <span className="text-foreground/70">Don't have an account?</span>{" "}
            <Link to="/signup" className="text-primary hover:underline font-medium">
              Sign up
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
