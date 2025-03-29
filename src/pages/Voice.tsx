
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Volume2, Play, Download, Pause, Loader2, RotateCcw } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Voice() {
  const [text, setText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [generatedAudio, setGeneratedAudio] = useState<string | null>(null);
  const [voice, setVoice] = useState("emma");
  const [stability, setStability] = useState([75]);
  const [clarity, setClarity] = useState([85]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();
  
  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!text.trim()) {
      toast({
        title: "Empty text",
        description: "Please enter text to generate voice.",
        variant: "destructive",
      });
      return;
    }
    
    setIsGenerating(true);
    
    // Simulate generation delay
    setTimeout(() => {
      // In a production app, this would call an actual TTS API
      // For demo purposes, we're using a sample MP3
      setGeneratedAudio("https://audio-samples.github.io/samples/mp3/blizzard_biased/sample-4.mp3");
      setIsGenerating(false);
      
      toast({
        title: "Voice generated",
        description: "Your text has been converted to speech.",
      });
    }, 2000);
  };
  
  const handlePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  const handleAudioEnded = () => {
    setIsPlaying(false);
  };
  
  const handleReset = () => {
    setText("");
    setGeneratedAudio(null);
    setIsPlaying(false);
    setVoice("emma");
    setStability([75]);
    setClarity([85]);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };
  
  const handleDownload = () => {
    if (!generatedAudio) return;
    
    // Create an anchor element and set properties for download
    const link = document.createElement("a");
    link.href = generatedAudio;
    link.download = "generated-voice.mp3";
    link.click();
    
    toast({
      title: "Download started",
      description: "Your audio file is being downloaded.",
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold">AI Voice Generator</h1>
          </div>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Text to Speech</CardTitle>
              <CardDescription>
                Convert your text into natural-sounding speech
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleGenerate} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="voice">Select Voice</Label>
                    <Select value={voice} onValueChange={setVoice}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select voice" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="emma">Emma (Female, US)</SelectItem>
                        <SelectItem value="jackson">Jackson (Male, US)</SelectItem>
                        <SelectItem value="olivia">Olivia (Female, UK)</SelectItem>
                        <SelectItem value="noah">Noah (Male, UK)</SelectItem>
                        <SelectItem value="yuki">Yuki (Female, JP)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <Label htmlFor="stability">Stability</Label>
                      <span className="text-sm text-muted-foreground">{stability[0]}%</span>
                    </div>
                    <Slider
                      id="stability"
                      min={0}
                      max={100}
                      step={1}
                      value={stability}
                      onValueChange={setStability}
                    />
                    
                    <div className="flex justify-between">
                      <Label htmlFor="clarity">Clarity & Enhancement</Label>
                      <span className="text-sm text-muted-foreground">{clarity[0]}%</span>
                    </div>
                    <Slider
                      id="clarity"
                      min={0}
                      max={100}
                      step={1}
                      value={clarity}
                      onValueChange={setClarity}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="text">Text to Convert</Label>
                  <Textarea
                    id="text"
                    placeholder="Enter the text you want to convert to speech..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="min-h-[150px]"
                  />
                </div>
                
                <div className="flex space-x-2">
                  <Button
                    type="submit"
                    className="flex-1"
                    disabled={isGenerating || !text.trim()}
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating
                      </>
                    ) : (
                      <>
                        <Volume2 className="mr-2 h-4 w-4" /> Generate Voice
                      </>
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleReset}
                    disabled={isGenerating}
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
          
          {generatedAudio && (
            <Card>
              <CardHeader>
                <CardTitle>Generated Audio</CardTitle>
              </CardHeader>
              <CardContent>
                <audio 
                  ref={audioRef} 
                  src={generatedAudio} 
                  onEnded={handleAudioEnded} 
                  className="w-full" 
                />
                
                <div className="bg-muted rounded-md p-4 mt-4">
                  <p className="text-sm text-center italic">
                    "{text.length > 100 ? text.slice(0, 100) + "..." : text}"
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handlePlay}
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <Button onClick={handleDownload}>
                  <Download className="mr-2 h-4 w-4" /> Download Audio
                </Button>
              </CardFooter>
            </Card>
          )}
          
          <div className="mt-12">
            <Card>
              <CardHeader>
                <CardTitle>Voice Technology</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-6 sm:grid-cols-3">
                <div className="flex flex-col items-center text-center p-4">
                  <div className="bg-primary/10 p-3 rounded-full mb-4">
                    <Volume2 className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-medium mb-2">Natural Voices</h3>
                  <p className="text-sm text-muted-foreground">
                    Ultra-realistic voices with human-like intonation and rhythm
                  </p>
                </div>
                
                <div className="flex flex-col items-center text-center p-4">
                  <div className="bg-primary/10 p-3 rounded-full mb-4">
                    <Volume2 className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-medium mb-2">Multi-language</h3>
                  <p className="text-sm text-muted-foreground">
                    Support for over 20 languages and multiple regional accents
                  </p>
                </div>
                
                <div className="flex flex-col items-center text-center p-4">
                  <div className="bg-primary/10 p-3 rounded-full mb-4">
                    <Volume2 className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-medium mb-2">Custom Voices</h3>
                  <p className="text-sm text-muted-foreground">
                    Create and customize voices to match your specific needs
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
