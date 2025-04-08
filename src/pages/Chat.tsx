
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

// Enhanced AI processor with more capabilities
const processAIResponse = (input: string) => {
  const lowercaseInput = input.toLowerCase();
  
  // Content generation for different media types
  if (lowercaseInput.includes("write") || lowercaseInput.includes("generate") || lowercaseInput.includes("create")) {
    if (lowercaseInput.includes("video") || lowercaseInput.includes("movie")) {
      return {
        text: "I've generated a sample video script for you:\n\n[SCENE 1: Exterior - City Street - Day]\nThe camera pans across a busy street, showing people using various AI-powered devices in their daily lives.\n\nVOICEOVER: In a world where technology shapes our every interaction...\n\n[SCENE 2: Close-up - Smart Device]\nA person asks their smart device a complex question and receives an immediate, thoughtful response.\n\nVOICEOVER: AI is more than just an assistant. It's becoming a companion on our journey.\n\nThis script is designed to be engaging and visually compelling. In a full implementation, I could generate complete video content based on your specific requirements.",
        contentType: "video"
      };
    } else if (lowercaseInput.includes("document") || lowercaseInput.includes("report") || lowercaseInput.includes("paper")) {
      return {
        text: "# Artificial Intelligence: Present and Future\n\n## Executive Summary\nThis document explores the current state of artificial intelligence and potential future developments. AI has become deeply integrated into daily life through voice assistants, recommendation systems, and automated processes.\n\n## Current Applications\n- **Natural Language Processing**: Enabling machines to understand and generate human language\n- **Computer Vision**: Allowing systems to interpret and analyze visual information\n- **Recommendation Systems**: Personalizing content and product suggestions\n\n## Future Directions\n1. **Multimodal AI**: Systems that combine text, vision, audio, and other inputs\n2. **Human-AI Collaboration**: Tools designed specifically to enhance human capabilities\n3. **Responsible AI Development**: Ethical frameworks and governance\n\n## Conclusion\nThe continued evolution of AI presents both significant opportunities and challenges that require thoughtful navigation.",
        contentType: "document"
      };
    } else if (lowercaseInput.includes("voice") || lowercaseInput.includes("audio") || lowercaseInput.includes("speech")) {
      return {
        text: "I've prepared a voice script for you:\n\nHello there! This is a demonstration of AI-generated voice content. In a full implementation, this text would be converted to natural-sounding speech using advanced text-to-speech technology. The voice could be customized for tone, pace, and style to match your specific needs. Voice generation can be used for audiobooks, podcasts, educational content, or even personalized messages.",
        contentType: "voice"
      };
    } else {
      return {
        text: "Here's the content I've generated based on your request:\n\n\"Artificial Intelligence has transformed from a theoretical concept to an essential part of our daily lives. From the moment we wake up and check our personalized news feeds to the recommendations we receive while shopping online, AI systems are working behind the scenes to enhance our experiences. These systems continuously learn from vast amounts of data, allowing them to improve over time and provide increasingly relevant and helpful interactions.\n\nUnlike traditional software that follows pre-programmed instructions, modern AI can adapt to new situations and make decisions based on patterns it has identified. This flexibility makes it valuable across countless industries, from healthcare where it helps diagnose diseases to agriculture where it optimizes crop yields.\"",
        contentType: "text"
      };
    }
  }
  
  // General knowledge about AI
  if (lowercaseInput.includes("what is ai") || lowercaseInput.includes("artificial intelligence")) {
    return {
      text: "Artificial Intelligence (AI) refers to computer systems designed to perform tasks that typically require human intelligence. These include learning, reasoning, problem-solving, perception, and language understanding.\n\nAI technologies can be categorized into:\n\n- **Narrow AI**: Systems designed for a specific task (like voice assistants)\n- **General AI**: Systems with human-like capabilities across different domains (still theoretical)\n- **Machine Learning**: AI systems that improve through experience\n- **Deep Learning**: Advanced ML using neural networks with multiple layers\n\nAI powers many tools we use daily, from recommendation systems on streaming platforms to voice assistants and advanced search engines.",
      contentType: "text"
    };
  }
  
  // Advanced pattern matching for code generation
  if (lowercaseInput.includes("code") || lowercaseInput.includes("program") || lowercaseInput.includes("function")) {
    return {
      text: "Here's a code sample based on your request:\n\n```javascript\n// Simple AI model for sentiment analysis\nclass SentimentAnalyzer {\n  constructor() {\n    // Pre-defined sentiment dictionaries\n    this.positiveWords = ['good', 'great', 'excellent', 'happy', 'positive', 'wonderful', 'love'];\n    this.negativeWords = ['bad', 'awful', 'terrible', 'sad', 'negative', 'horrible', 'hate'];\n  }\n\n  analyze(text) {\n    const words = text.toLowerCase().split(/\\W+/);\n    let positiveScore = 0;\n    let negativeScore = 0;\n    \n    words.forEach(word => {\n      if (this.positiveWords.includes(word)) positiveScore++;\n      if (this.negativeWords.includes(word)) negativeScore++;\n    });\n    \n    const overallScore = positiveScore - negativeScore;\n    \n    return {\n      score: overallScore,\n      sentiment: overallScore > 0 ? 'positive' : \n                overallScore < 0 ? 'negative' : 'neutral',\n      positiveWords: words.filter(word => this.positiveWords.includes(word)),\n      negativeWords: words.filter(word => this.negativeWords.includes(word))\n    };\n  }\n}\n\n// Example usage\nconst analyzer = new SentimentAnalyzer();\nconst result = analyzer.analyze('I really love this amazing product, but the delivery was terrible.');\nconsole.log(result);\n```\n\nThis is a simple sentiment analyzer implementation in JavaScript. In a production environment, you would want to use more sophisticated models with larger dictionaries and weighting systems.",
      contentType: "text"
    };
  }
  
  // Simple pattern matching for different queries
  if (lowercaseInput.includes("hello") || lowercaseInput.includes("hi")) {
    return {
      text: "Hello! I'm your AI assistant. I can help you generate content, answer questions, or provide information on various topics. What would you like to create today? I can help with text, documents, video scripts, or voice content.",
      contentType: "text"
    };
  } else if (lowercaseInput.includes("help") || lowercaseInput.includes("assistance") || lowercaseInput.includes("what can you do")) {
    return {
      text: "I'm here to help with various tasks:\n\n- Generate text content for articles, blogs, or social media\n- Create document outlines and reports\n- Develop video scripts and storyboards\n- Write voice scripts for audio content\n- Answer questions about AI and technology\n- Provide code samples and explanations\n- Assist with problem-solving and ideation\n\nJust let me know what you'd like to work on, and I'll do my best to assist!",
      contentType: "text"
    };
  } else if (lowercaseInput.includes("thank")) {
    return {
      text: "You're welcome! I'm glad I could help. Is there anything else you'd like to know or create today?",
      contentType: "text"
    };
  }
  
  // Default response with more AI capabilities
  const responses = [
    "I can help you create various types of content including text, documents, video scripts, and voice recordings. What specific type of content would you like to generate?",
    "Based on your message, I can offer several AI-powered solutions. Would you like me to generate written content, create a document structure, develop a video script, or prepare audio content?",
    "I'm designed to assist with content creation across multiple formats. I can help with text generation, document preparation, video scripting, or voice content. Which would be most helpful for your current needs?",
    "As an AI assistant, I can generate text content, create document outlines, develop video scripts, or prepare voice recordings. How can I best help with your specific requirements?",
    "I'd be happy to assist with your content needs. My capabilities include generating text, creating document structures, developing video scripts, and preparing voice content. What type of content would you like to focus on?"
  ];
  
  return {
    text: responses[Math.floor(Math.random() * responses.length)],
    contentType: "text"
  };
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
    
    // Process the message with our enhanced AI function
    setTimeout(() => {
      const response = processAIResponse(userMessage.content);
      
      const aiMessage: Message = {
        id: Date.now().toString(),
        content: response.text,
        role: "assistant",
        timestamp: new Date(),
        contentType: response.contentType || "text"
      };
      
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
      
      // Notify user about the content type generated
      if (response.contentType && response.contentType !== "text") {
        toast({
          title: `${response.contentType.charAt(0).toUpperCase() + response.contentType.slice(1)} content generated`,
          description: `The AI has created ${response.contentType} content for you.`,
        });
      }
    }, 1500);
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
