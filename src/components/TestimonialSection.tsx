
import React from "react";
import { Avatar } from "@/components/ui/avatar";

const testimonials = [
  {
    quote: "This AI platform has completely transformed my content creation process. I can generate ideas, outlines, and full articles in minutes rather than hours.",
    author: "Alex Johnson",
    role: "Content Creator",
    avatar: "A"
  },
  {
    quote: "The voice AI feature is incredible. I've been using it for my YouTube videos and podcast, and the quality is indistinguishable from professional voice actors.",
    author: "Samantha Lee",
    role: "YouTuber",
    avatar: "S"
  },
  {
    quote: "As a developer, the coding assistance has saved me countless hours debugging and refactoring my projects. It's like having an expert pair programmer at all times.",
    author: "Michael Chen",
    role: "Software Engineer",
    avatar: "M"
  }
];

export default function TestimonialSection() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold">
            What Our Users Are Saying
          </h2>
          <p className="mt-4 text-lg text-foreground/80">
            See how GenZify is helping creators and innovators achieve more with AI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="flex flex-col h-full bg-background rounded-xl border border-border p-6 shadow-sm hover-lift"
            >
              <div className="flex-1">
                <p className="italic text-foreground/80 mb-6">"{testimonial.quote}"</p>
              </div>
              <div className="flex items-center mt-4">
                <Avatar className="h-10 w-10 bg-primary/20 text-primary">
                  <span className="text-sm font-medium">{testimonial.avatar}</span>
                </Avatar>
                <div className="ml-4">
                  <p className="font-medium">{testimonial.author}</p>
                  <p className="text-sm text-foreground/60">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
