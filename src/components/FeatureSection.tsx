
import React from "react";
import { MessageSquare, LineChart, Sparkles, Volume2, Cpu, Rocket } from "lucide-react";

const features = [
  {
    icon: <MessageSquare className="h-10 w-10" />,
    title: "AI Chat Assistants",
    description: "Intelligent chatbots powered by state-of-the-art language models that learn from conversations."
  },
  {
    icon: <Sparkles className="h-10 w-10" />,
    title: "Content Generation",
    description: "Create compelling text, images, and creative content with just a few clicks."
  },
  {
    icon: <Volume2 className="h-10 w-10" />,
    title: "Voice AI",
    description: "Generate natural sounding voice overs and audio content with our ElevenLabs integration."
  },
  {
    icon: <LineChart className="h-10 w-10" />,
    title: "AI Analytics",
    description: "Track usage patterns and improve your AI workflows with detailed analytics."
  },
  {
    icon: <Cpu className="h-10 w-10" />,
    title: "Custom AI Models",
    description: "Fine-tune AI models for your specific needs with our easy-to-use tools."
  },
  {
    icon: <Rocket className="h-10 w-10" />,
    title: "Automation Tools",
    description: "Streamline your workflows and save time with powerful automation capabilities."
  }
];

export default function FeatureSection() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold">
            Next-Generation AI Tools
          </h2>
          <p className="mt-4 text-lg text-foreground/80">
            Our platform brings together the latest advancements in AI technology,
            packaged in intuitive interfaces designed for Gen Z creators.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-background rounded-xl border border-border p-6 shadow-sm hover-lift"
            >
              <div className="h-14 w-14 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-foreground/70">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
