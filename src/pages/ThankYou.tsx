
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

export default function ThankYou() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-24">
        <div className="max-w-md mx-auto text-center">
          <div className="flex justify-center mb-6">
            <CheckCircle className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Thank You!</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Your message has been received. We'll get back to you as soon as possible.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link to="/">Return to Home</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/blog">Browse Our Blog</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
