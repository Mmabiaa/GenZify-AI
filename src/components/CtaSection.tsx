
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function CtaSection() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="relative rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-90"></div>
          
          <div className="relative z-10 flex flex-col items-center text-center text-white p-12 md:p-16">
            <h2 className="text-3xl md:text-4xl font-bold max-w-2xl">
              Ready to experience the next generation of AI tools?
            </h2>
            <p className="mt-6 text-lg max-w-2xl text-white/90">
              Join thousands of creators, developers, and innovators who are leveraging the power of AI to work smarter, create faster, and achieve more.
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
                <Link to="/chat">Try for Free</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/20">
                <Link to="/pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
