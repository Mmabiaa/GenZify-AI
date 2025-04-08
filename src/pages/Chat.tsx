
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { Sparkles, Send, Bot, User, ArrowDown, X, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type Message = {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
};

// Simple AI processor using JavaScript pattern matching
const processAIResponse = (input: string) => {
  const lowercaseInput = input.toLowerCase();
  
  // Simple pattern matching for different queries
  if (lowercaseInput.includes("hello") || lowercaseInput.includes("hi")) {
    return "Hello! How can I assist you today?";
  } else if (lowercaseInput.includes("help") || lowercaseInput.includes("assistance")) {
    return "I'm here to help! You can ask me about content generation, voice synthesis, or any other AI-related questions.";
  } else if (lowercaseInput.includes("generate") && lowercaseInput.includes("content")) {
    return "I can help generate content for blogs, social media, or websites. What specific content would you like me to create?";
  } else if (lowercaseInput.includes("voice") || lowercaseInput.includes("audio")) {
    return "Our voice generation technology can create natural-sounding speech from text. You can try it out in the Voice Generation section of our platform.";
  } else if (lowercaseInput.includes("features") || lowercaseInput.includes("what can you do")) {
    return "I can assist with text generation, voice synthesis, content ideas, and more. Our platform also offers dashboard analytics, image generation concepts, and code assistance.";
  } else if (lowercaseInput.includes("weather")) {
    return "I don't have access to real-time weather data in this demo. In a production environment, I would connect to a weather API to provide that information.";
  } else if (lowercaseInput.includes("joke") || lowercaseInput.includes("funny")) {
    return "Why don't scientists trust atoms? Because they make up everything!";
  } else if (lowercaseInput.includes("thank")) {
    return "You're welcome! Is there anything else I can help you with?";
  } else {
    // A more complex response for general queries
    const responses = [
      "Based on your request, I'd recommend exploring our content generation tools. They can help create tailored content for your specific needs.",
      "That's an interesting question. From my understanding, this would involve using our AI system to analyze patterns and generate relevant outputs.",
      "I'd suggest using a combination of our text and voice generation tools to accomplish this. Would you like me to explain how?",
      "This is definitely something our AI platform can help with. The approach would involve processing your input through our language models to generate appropriate responses.",
      "Great question! Our AI system is designed to handle this type of request by leveraging both pattern recognition and generative capabilities."
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  }
};

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    
    // Process the message with our simple AI function
    setTimeout(() => {
      const response = processAIResponse(userMessage.content);
      
      const aiMessage: Message = {
        id: Date.now().toString(),
        content: response,
        role: "assistant",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);
  };
  
  const clearChat = () => {
    setMessages([]);
    toast({
      title: "Chat cleared",
      description: "All messages have been removed.",
    });
  };
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">AI Chat Assistant</h1>
            {messages.length > 0 && (
              <Button variant="outline" size="sm" onClick={clearChat}>
                <X className="h-4 w-4 mr-2" /> Clear Chat
              </Button>
            )}
          </div>
          
          <div className="border border-border bg-background rounded-lg min-h-[60vh] flex flex-col">
            <div className="flex-1 p-4 overflow-y-auto">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center opacity-70">
                  <Sparkles className="h-12 w-12 mb-4 text-primary" />
                  <h3 className="text-lg font-medium">How can I help you today?</h3>
                  <p className="text-sm text-foreground/60 max-w-md mt-2">
                    Ask me anything! I can provide information, assist with tasks, generate content, and more.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.role === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                          message.role === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        <div className="flex items-center mb-1">
                          {message.role === "assistant" ? (
                            <Bot className="h-4 w-4 mr-2" />
                          ) : (
                            <User className="h-4 w-4 mr-2" />
                          )}
                          <span className="text-xs font-medium">
                            {message.role === "user" ? "You" : "AI Assistant"}
                          </span>
                        </div>
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        <div className="text-right mt-1">
                          <span className="text-xs opacity-70">
                            {new Date(message.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="max-w-[80%] rounded-2xl px-4 py-3 bg-muted flex items-center">
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        <span className="text-sm">AI is thinking...</span>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>
            
            {messages.length > 3 && (
              <div className="absolute bottom-24 right-8">
                <Button 
                  size="sm" 
                  variant="secondary" 
                  className="rounded-full" 
                  onClick={scrollToBottom}
                >
                  <ArrowDown className="h-4 w-4" />
                </Button>
              </div>
            )}
            
            <div className="border-t border-border p-4">
              <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message here..."
                  className="flex-1"
                  disabled={isLoading}
                />
                <Button type="submit" disabled={isLoading || !input.trim()}>
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </form>
              <div className="text-xs text-center mt-3 text-foreground/50">
                AI powered by next-generation language models
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
