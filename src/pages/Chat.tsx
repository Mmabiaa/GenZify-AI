
import { generateAIResponse } from "@/lib/openai";
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Sparkles, Send, Bot, User, ArrowDown, X, Loader2, Video, FileText, Volume2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type Message = {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
  contentType?: "text" | "voice" | "video" | "document";
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
      contentType: "text"
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    
   // NEW: Use real AI API call
const response = await generateAIResponse(userMessage.content, import.meta.env.VITE_OPENAI_API_KEY || null)

const aiMessage: Message = {
  id: Date.now().toString(),
  content: response.text,
  role: "assistant",
  timestamp: new Date(),
  contentType: response.contentType || "text",
}

setMessages((prev) => [...prev, aiMessage])
setIsLoading(false)

// Optional toast
if (response.contentType !== "text") {
  toast({
    title: `${response.contentType.charAt(0).toUpperCase() + response.contentType.slice(1)} generated`,
    description: `AI created ${response.contentType} content.`,
  })
}

  
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
  
  const getContentTypeIcon = (contentType?: string) => {
    switch(contentType) {
      case "video":
        return <Video className="h-4 w-4 text-blue-400" />;
      case "document":
        return <FileText className="h-4 w-4 text-green-400" />;
      case "voice":
        return <Volume2 className="h-4 w-4 text-purple-400" />;
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">AI Assistant</h1>
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
                    Ask me anything! I can generate text, documents, video scripts, voice content, and more.
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
                          {message.contentType && message.contentType !== "text" && (
                            <div className="ml-2 flex items-center">
                              {getContentTypeIcon(message.contentType)}
                              <span className="text-xs ml-1 opacity-70 capitalize">
                                {message.contentType}
                              </span>
                            </div>
                          )}
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
                  placeholder="Ask me to generate text, documents, video scripts, or voice content..."
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
              <div className="text-xs text-center mt-3 text-foreground/50 flex justify-center items-center gap-1">
                <Sparkles className="h-3 w-3" /> 
                AI powered by advanced language models
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
