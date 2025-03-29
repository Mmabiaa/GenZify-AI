
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Copy, Download, Wand2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type ContentType = "blog" | "social" | "email" | "ad" | "story";

export default function ContentGenerator() {
  const [prompt, setPrompt] = useState("");
  const [contentType, setContentType] = useState<ContentType>("blog");
  const [tone, setTone] = useState("professional");
  const [length, setLength] = useState([500]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");
  const { toast } = useToast();
  
  const handleGenerate = () => {
    if (!prompt) {
      toast({
        title: "Prompt required",
        description: "Please enter a prompt to generate content.",
        variant: "destructive",
      });
      return;
    }
    
    setIsGenerating(true);
    setGeneratedContent("");
    
    // Simulate content generation
    setTimeout(() => {
      const contentTemplates = {
        blog: `# ${prompt}\n\n## Introduction\nIn today's fast-paced digital landscape, understanding ${prompt} has become increasingly important for businesses and individuals alike.\n\n## Key Points\n1. The evolution of ${prompt} in recent years\n2. How ${prompt} impacts everyday operations\n3. Strategies for optimizing your approach to ${prompt}\n\n## Best Practices\nWhen considering ${prompt}, it's essential to maintain a strategic perspective. Industry leaders recommend focusing on metrics that truly matter rather than getting lost in vanity data points.\n\n## Conclusion\nAs we've explored throughout this article, ${prompt} represents both challenges and opportunities. By taking a methodical approach and staying informed on industry trends, you'll be well-positioned to leverage this knowledge for future success.`,
        social: `✨ Just dropping some knowledge about ${prompt} ✨\n\nDid you know? The most successful approaches to ${prompt} focus on three key elements:\n\n1️⃣ Strategic planning\n2️⃣ Consistent execution\n3️⃣ Data-driven refinement\n\nComment below with your experience on ${prompt}! Let's start a conversation. 👇\n\n#TrendingNow #${prompt.replace(/\s+/g, '')} #GenZTips`,
        email: `Subject: Important Updates Regarding ${prompt}\n\nDear Valued Partner,\n\nI hope this email finds you well. I wanted to reach out personally regarding our recent developments with ${prompt}.\n\nOur team has been working diligently to enhance our approach to ${prompt}, and I'm pleased to share some exciting updates with you.\n\nIn the coming weeks, we'll be rolling out new features designed to optimize your experience with ${prompt}. These improvements are based directly on feedback we've received from partners like you.\n\nPlease let me know if you have any questions or would like to schedule a call to discuss these changes in more detail.\n\nBest regards,\n[Your Name]`,
        ad: `**INTRODUCING: Revolutionary Approach to ${prompt}**\n\n🔥 TRANSFORM how you handle ${prompt} forever\n🔥 SAVE hours of time and resources\n🔥 BOOST your results by up to 300%\n\nDon't miss out on the opportunity to revolutionize your approach to ${prompt}. Early adopters are seeing unprecedented results!\n\nClick now to learn more. Limited time offer available!`,
        story: `The sun was setting over the city skyline as Alex pondered the complexities of ${prompt}. It had been three years since the concept first emerged, yet the implications were still unfolding in ways nobody had predicted.\n\n"You're overthinking it again," said Jordan, sliding a coffee across the table.\n\n"Maybe," Alex replied, "but ${prompt} isn't just another trend. It's changing everything about how we operate."\n\nJordan smiled knowingly. They'd had this conversation before, but this time felt different. The recent developments in ${prompt} had caught everyone off guard.\n\n"Remember what Professor Chen always said?" Jordan asked. "'In complexity lies opportunity.'\n\nAlex nodded slowly, a new perspective beginning to form. Perhaps the challenge of ${prompt} wasn't an obstacle but a doorway to something greater.`
      };
      
      setGeneratedContent(contentTemplates[contentType]);
      setIsGenerating(false);
      
      toast({
        title: "Content generated",
        description: "Your content has been successfully generated.",
      });
    }, 3000);
  };
  
  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent);
    toast({
      title: "Copied to clipboard",
      description: "Content has been copied to your clipboard.",
    });
  };
  
  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([generatedContent], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `generated-content-${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast({
      title: "Content downloaded",
      description: "Your content has been downloaded as a text file.",
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">AI Content Generator</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-background border border-border rounded-lg p-6">
                <h2 className="text-lg font-medium mb-4">Generation Settings</h2>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="prompt">Your Prompt</Label>
                    <Textarea
                      id="prompt"
                      placeholder="Describe the content you want to generate..."
                      className="mt-1"
                      rows={5}
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="content-type">Content Type</Label>
                    <Select
                      value={contentType}
                      onValueChange={(value) => setContentType(value as ContentType)}
                    >
                      <SelectTrigger id="content-type" className="mt-1">
                        <SelectValue placeholder="Select content type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="blog">Blog Post</SelectItem>
                        <SelectItem value="social">Social Media Post</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="ad">Advertisement</SelectItem>
                        <SelectItem value="story">Creative Story</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="tone">Tone</Label>
                    <Select value={tone} onValueChange={setTone}>
                      <SelectTrigger id="tone" className="mt-1">
                        <SelectValue placeholder="Select tone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="casual">Casual</SelectItem>
                        <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
                        <SelectItem value="formal">Formal</SelectItem>
                        <SelectItem value="humorous">Humorous</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <Label htmlFor="length">Length (words)</Label>
                      <span className="text-sm text-foreground/70">{length[0]}</span>
                    </div>
                    <Slider
                      id="length"
                      min={100}
                      max={2000}
                      step={100}
                      value={length}
                      onValueChange={setLength}
                    />
                  </div>
                  
                  <Button
                    onClick={handleGenerate}
                    className="w-full"
                    disabled={!prompt || isGenerating}
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Wand2 className="mr-2 h-4 w-4" />
                        Generate Content
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-2">
              <div className="bg-background border border-border rounded-lg p-6 h-full flex flex-col">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium">Generated Content</h2>
                  {generatedContent && (
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" onClick={handleCopy}>
                        <Copy className="h-4 w-4 mr-1" /> Copy
                      </Button>
                      <Button size="sm" variant="outline" onClick={handleDownload}>
                        <Download className="h-4 w-4 mr-1" /> Download
                      </Button>
                    </div>
                  )}
                </div>
                
                {isGenerating ? (
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                      <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
                      <p className="mt-4">Generating amazing content for you...</p>
                    </div>
                  </div>
                ) : generatedContent ? (
                  <div className="flex-1 overflow-y-auto whitespace-pre-wrap border border-border rounded p-4 bg-muted/30">
                    {generatedContent}
                  </div>
                ) : (
                  <div className="flex-1 flex items-center justify-center text-center text-foreground/50">
                    <div>
                      <Wand2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p className="text-lg font-medium">Your generated content will appear here</p>
                      <p className="text-sm max-w-md mx-auto mt-2">
                        Configure your settings and click "Generate Content" to create
                        AI-powered text based on your prompt.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
