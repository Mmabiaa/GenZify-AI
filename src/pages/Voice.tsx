
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { Volume2, Pause, Play, Loader2, Download } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Voice {
  id: string;
  name: string;
  gender: string;
}

const voices: Voice[] = [
  { id: "v1", name: "Alex", gender: "Male" },
  { id: "v2", name: "Emily", gender: "Female" },
  { id: "v3", name: "Jason", gender: "Male" },
  { id: "v4", name: "Sophie", gender: "Female" },
  { id: "v5", name: "Michael", gender: "Male" }
];

export default function Voice() {
  const [text, setText] = useState("");
  const [selectedVoice, setSelectedVoice] = useState<string>("v1");
  const [stability, setStability] = useState([80]);
  const [clarity, setClarity] = useState([75]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const handleGenerate = () => {
    if (!text) {
      toast({
        title: "Text required",
        description: "Please enter text to convert to speech.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    setAudioUrl(null);

    // Simulate voice generation
    setTimeout(() => {
      // In a real implementation, this would be the URL returned from the ElevenLabs API
      setAudioUrl("https://audio-samples.github.io/samples/mp3/blizzard_biased/sample-4.mp3");
      setIsGenerating(false);

      toast({
        title: "Voice generated",
        description: "Your text has been converted to speech.",
      });
    }, 3000);
  };

  const togglePlayback = () => {
    const audioElement = document.getElementById("audio-player") as HTMLAudioElement;
    if (isPlaying) {
      audioElement.pause();
    } else {
      audioElement.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  const handleDownload = () => {
    if (!audioUrl) return;

    const link = document.createElement("a");
    link.href = audioUrl;
    link.download = "generated-voice.mp3";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Audio downloaded",
      description: "Your generated voice has been downloaded.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">AI Voice Generator</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-background border border-border rounded-lg p-6">
                <h2 className="text-lg font-medium mb-4">Text to Speech</h2>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="text-input">Text to Convert</Label>
                    <Textarea
                      id="text-input"
                      placeholder="Enter the text you want to convert to speech..."
                      className="mt-1"
                      rows={6}
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="voice-select">Voice</Label>
                    <Select
                      value={selectedVoice}
                      onValueChange={setSelectedVoice}
                    >
                      <SelectTrigger id="voice-select" className="mt-1">
                        <SelectValue placeholder="Select a voice" />
                      </SelectTrigger>
                      <SelectContent>
                        {voices.map((voice) => (
                          <SelectItem key={voice.id} value={voice.id}>
                            {voice.name} ({voice.gender})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <Label htmlFor="stability">Stability</Label>
                      <span className="text-sm text-foreground/70">{stability[0]}%</span>
                    </div>
                    <Slider
                      id="stability"
                      min={0}
                      max={100}
                      step={1}
                      value={stability}
                      onValueChange={setStability}
                    />
                    <p className="text-xs text-foreground/50 mt-1">
                      Higher stability makes the voice more consistent but less expressive.
                    </p>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <Label htmlFor="clarity">Clarity + Similarity</Label>
                      <span className="text-sm text-foreground/70">{clarity[0]}%</span>
                    </div>
                    <Slider
                      id="clarity"
                      min={0}
                      max={100}
                      step={1}
                      value={clarity}
                      onValueChange={setClarity}
                    />
                    <p className="text-xs text-foreground/50 mt-1">
                      Adjust how closely the output matches the selected voice.
                    </p>
                  </div>

                  <Button
                    onClick={handleGenerate}
                    className="w-full"
                    disabled={!text || isGenerating}
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating Voice...
                      </>
                    ) : (
                      <>
                        <Volume2 className="mr-2 h-4 w-4" />
                        Generate Voice
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-background border border-border rounded-lg p-6 h-full flex flex-col">
                <h2 className="text-lg font-medium mb-4">Voice Preview</h2>

                {isGenerating ? (
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                      <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
                      <p className="mt-4">Converting text to speech...</p>
                      <p className="text-sm text-foreground/70 mt-2">
                        Powered by ElevenLabs AI
                      </p>
                    </div>
                  </div>
                ) : audioUrl ? (
                  <div className="flex-1 flex flex-col">
                    <div className="flex-1 mb-6">
                      <div className="bg-muted/30 p-4 rounded-lg border border-border">
                        <p className="text-sm whitespace-pre-wrap">{text}</p>
                      </div>
                    </div>

                    <div className="border-t border-border pt-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={togglePlayback}
                            className="mr-2"
                          >
                            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                          </Button>
                          <span className="text-sm font-medium">
                            {voices.find((v) => v.id === selectedVoice)?.name || "Voice"} Preview
                          </span>
                        </div>
                        <Button variant="outline" size="sm" onClick={handleDownload}>
                          <Download className="h-4 w-4 mr-1" /> Download
                        </Button>
                      </div>

                      <audio
                        id="audio-player"
                        src={audioUrl}
                        onEnded={handleAudioEnded}
                        className="w-full"
                        controls
                        hidden
                      />

                      <div className="animate-pulse flex justify-center">
                        <div className="flex items-center gap-1 h-8">
                          {Array.from({ length: 20 }).map((_, i) => (
                            <div
                              key={i}
                              className={`w-1 bg-primary/60 rounded-full`}
                              style={{
                                height: `${Math.max(5, Math.random() * 32)}px`,
                                opacity: isPlaying ? 1 : 0.4,
                              }}
                            ></div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex items-center justify-center text-center">
                    <div>
                      <Volume2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p className="text-lg font-medium">No Audio Generated Yet</p>
                      <p className="text-sm max-w-xs mx-auto mt-2">
                        Enter your text and click "Generate Voice" to create lifelike speech.
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
