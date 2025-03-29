
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <div className="relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-secondary/20 rounded-full blur-3xl animate-pulse-glow delay-700"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-accent/20 rounded-full blur-3xl animate-pulse-glow delay-500"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-24 sm:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col space-y-8 animate-fade-in">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                Next-Gen 
                <span className="bg-clip-text text-transparent hero-gradient"> AI Platform </span>
                for <span className="bg-clip-text text-transparent hero-gradient">Generation Z</span>
              </h1>
              <p className="mt-6 text-xl text-foreground/80 max-w-2xl">
                Create, innovate, and automate with our powerful AI tools designed for the next generation. From content creation to smart chatbots and voice generation.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/chat">Try AI Chat</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/about" className="flex items-center">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-foreground/60">
              <div className="flex -space-x-2">
                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-xs text-primary">
                  A
                </div>
                <div className="h-8 w-8 rounded-full bg-secondary/20 flex items-center justify-center text-xs text-secondary">
                  B
                </div>
                <div className="h-8 w-8 rounded-full bg-accent/20 flex items-center justify-center text-xs text-accent">
                  C
                </div>
              </div>
              <span>Trusted by 1000+ forward-thinking creators</span>
            </div>
          </div>
          
          {/* 3D Visualization */}
          <div className="hidden lg:block relative animate-fade-in animation-delay-300">
            <div className="relative w-full aspect-square">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-secondary to-accent opacity-20 blur-2xl animate-spin-slow"></div>
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 relative animate-float">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-2xl rotate-45 transform-gpu"></div>
                  <div className="absolute inset-2 bg-background rounded-xl rotate-45 transform-gpu flex items-center justify-center">
                    <span className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">
                      AI
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
