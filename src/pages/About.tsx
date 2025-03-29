
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Bot, LineChart, Sparkles, Rocket, Volume2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-1/3 w-72 h-72 bg-secondary/10 rounded-full blur-3xl"></div>
          </div>
          
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                The Next Generation of 
                <span className="bg-clip-text text-transparent hero-gradient"> AI Tools</span>
              </h1>
              <p className="text-xl text-foreground/80 mb-8">
                GenZify is building the future of AI-powered content creation, chatbots, and voice generation for the next generation of creators, developers, and innovators.
              </p>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-6 text-center">Our Mission</h2>
              <p className="text-lg text-foreground/80">
                Our mission is to democratize access to cutting-edge AI technology, making it accessible and usable by everyone. We believe that AI should be a tool that enhances human creativity and productivity, not replace it. By providing powerful, user-friendly tools, we're empowering the next generation to create, innovate, and solve problems in ways that weren't possible before.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                {
                  icon: <Sparkles className="h-8 w-8" />,
                  title: "Innovation",
                  description: "We're constantly pushing the boundaries of what's possible with AI, integrating the latest research and technologies into our platform."
                },
                {
                  icon: <Bot className="h-8 w-8" />,
                  title: "Accessibility",
                  description: "We design our tools to be intuitive and easy to use, regardless of technical expertise or background."
                },
                {
                  icon: <Rocket className="h-8 w-8" />,
                  title: "Empowerment",
                  description: "We're committed to helping users achieve their goals, whether that's creating content, building products, or solving problems."
                }
              ].map((value, index) => (
                <div key={index} className="bg-background rounded-xl p-6 border border-border">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-foreground/70">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <p className="text-lg text-foreground/80 mb-6">
                  GenZify was founded in 2025 by Tech-By-Mmabiaa together with a team of AI researchers, engineers, and designers who were frustrated by the gap between cutting-edge AI research and accessible, user-friendly tools.
                </p>
                <p className="text-lg text-foreground/80 mb-6">
                  We saw how generative AI was transforming industries, but noticed that many powerful tools were either too complex for everyday users or too limited in their capabilities.
                </p>
                <p className="text-lg text-foreground/80">
                  Today, our team is dedicated to building a comprehensive AI platform that brings together the best of language models, voice synthesis, and content generation in one intuitive interface.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                {[
                  { number: "10+", label: "AI Models" },
                  { number: "50K+", label: "Users" },
                  { number: "1M+", label: "AI Interactions" },
                  { number: "24/7", label: "Support" }
                ].map((stat, index) => (
                  <div 
                    key={index} 
                    className="bg-background border border-border rounded-xl p-6 flex flex-col items-center justify-center text-center"
                  >
                    <span className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                      {stat.number}
                    </span>
                    <span className="text-sm text-foreground/70 mt-2">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Technology Stack</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <Bot className="h-10 w-10" />,
                  title: "Advanced AI Models",
                  description: "We leverage the latest language models from Anthropic and OpenAI to power our AI assistants and content generation tools."
                },
                {
                  icon: <Volume2 className="h-10 w-10" />,
                  title: "Voice Synthesis",
                  description: "Our voice generation technology uses ElevenLabs' cutting-edge voice synthesis to create natural-sounding speech in multiple languages."
                },
                {
                  icon: <LineChart className="h-10 w-10" />,
                  title: "Real-Time Analytics",
                  description: "Our platform includes comprehensive analytics to help you track usage, measure performance, and optimize your AI workflows."
                }
              ].map((tech, index) => (
                <div 
                  key={index} 
                  className="bg-background border border-border rounded-xl p-6 hover-lift"
                >
                  <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                    {tech.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{tech.title}</h3>
                  <p className="text-foreground/70">{tech.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-foreground/80 mb-8 max-w-2xl mx-auto">
              Join thousands of creators, developers, and innovators who are already using GenZify to build the future with AI.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/chat">Try for Free</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/login" className="flex items-center">
                  Create Account <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
