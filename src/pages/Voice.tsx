
import React, { useState, useRef, useEffect } from "react";
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
import { Volume2, Play, Download, Pause, Loader2, RotateCcw, Mic, MicOff, Wand2, Music, FileText, MoveUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Advanced voice synthesizer with pitch and rate control
class VoiceSynthesizer {
  private voices: SpeechSynthesisVoice[] = [];
  private synth: SpeechSynthesis;
  
  constructor() {
    this.synth = window.speechSynthesis;
    this.loadVoices();
    
    // Chrome requires a listener for voice loading
    if (typeof window !== 'undefined') {
      speechSynthesis.onvoiceschanged = this.loadVoices.bind(this);
    }
  }
  
  private loadVoices(): void {
    this.voices = this.synth.getVoices().filter(voice => 
      voice.lang.includes('en') || voice.lang.includes('ja')
    );
  }
  
  public getVoices(): SpeechSynthesisVoice[] {
    return this.voices;
  }
  
  public speak(text: string, voice: SpeechSynthesisVoice | null, rate: number = 1, pitch: number = 1): void {
    if (!text) return;
    
    // Cancel any current speech
    this.synth.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    if (voice) {
      utterance.voice = voice;
    }
    
    utterance.rate = rate;
    utterance.pitch = pitch;
    
    this.synth.speak(utterance);
  }
  
  public stop(): void {
    this.synth.cancel();
  }
  
  public pause(): void {
    this.synth.pause();
  }
  
  public resume(): void {
    this.synth.resume();
  }
  
  public isSpeaking(): boolean {
    return this.synth.speaking;
  }
}

// Enhanced audio recorder with visualization
class AudioRecorder {
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private dataArray: Uint8Array | null = null;
  private source: MediaStreamAudioSourceNode | null = null;
  private visualizationCallback: ((dataArray: Uint8Array) => void) | null = null;
  private animationFrame: number | null = null;
  
  async start(visualizationCallback?: (dataArray: Uint8Array) => void): Promise<void> {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(stream);
      this.audioChunks = [];
      
      // Set up audio context for visualization
      if (visualizationCallback) {
        this.visualizationCallback = visualizationCallback;
        this.audioContext = new AudioContext();
        this.analyser = this.audioContext.createAnalyser();
        this.analyser.fftSize = 256;
        
        const bufferLength = this.analyser.frequencyBinCount;
        this.dataArray = new Uint8Array(bufferLength);
        
        this.source = this.audioContext.createMediaStreamSource(stream);
        this.source.connect(this.analyser);
        
        this.visualize();
      }
      
      this.mediaRecorder.addEventListener('dataavailable', (event) => {
        this.audioChunks.push(event.data);
      });
      
      this.mediaRecorder.start();
    } catch (error) {
      console.error("Error starting audio recording:", error);
      throw error;
    }
  }
  
  private visualize(): void {
    if (!this.analyser || !this.dataArray || !this.visualizationCallback) return;
    
    this.analyser.getByteFrequencyData(this.dataArray);
    this.visualizationCallback(this.dataArray);
    
    this.animationFrame = requestAnimationFrame(this.visualize.bind(this));
  }
  
  stop(): Promise<string> {
    return new Promise((resolve) => {
      if (!this.mediaRecorder) {
        resolve('');
        return;
      }
      
      if (this.animationFrame) {
        cancelAnimationFrame(this.animationFrame);
        this.animationFrame = null;
      }
      
      this.mediaRecorder.addEventListener('stop', () => {
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        
        if (this.source) {
          this.source.disconnect();
          this.source = null;
        }
        
        if (this.audioContext) {
          this.audioContext.close();
          this.audioContext = null;
        }
        
        resolve(audioUrl);
      });
      
      this.mediaRecorder.stop();
      // Stop all microphone streams
      this.mediaRecorder.stream.getTracks().forEach(track => track.stop());
    });
  }
}

// Speech to text with enhanced capabilities
class SpeechToText {
  private recognition: SpeechRecognition | null = null;
  private isListening: boolean = false;
  
  constructor() {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      // @ts-ignore - WebkitSpeechRecognition is not in the types
      this.recognition = new webkitSpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
    } else {
      console.warn("Speech recognition not supported in this browser");
    }
  }
  
  start(onResult: (text: string, isFinal: boolean) => void, onEnd: () => void): void {
    if (!this.recognition) return;
    
    this.recognition.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscript = '';
      
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }
      
      if (finalTranscript) {
        onResult(finalTranscript, true);
      } else if (interimTranscript) {
        onResult(interimTranscript, false);
      }
    };
    
    this.recognition.onend = () => {
      this.isListening = false;
      onEnd();
    };
    
    this.recognition.start();
    this.isListening = true;
  }
  
  stop(): void {
    if (!this.recognition) return;
    
    this.recognition.stop();
    this.isListening = false;
  }
  
  isActive(): boolean {
    return this.isListening;
  }
}

// Advanced voice effects processor
class VoiceEffectsProcessor {
  private audioContext: AudioContext | null = null;
  private source: AudioBufferSourceNode | null = null;
  private gainNode: GainNode | null = null;
  private audioBuffer: AudioBuffer | null = null;
  private isPlaying: boolean = false;
  
  constructor() {
    if (typeof window !== 'undefined') {
      this.audioContext = new AudioContext();
    }
  }
  
  async loadAudio(url: string): Promise<void> {
    if (!this.audioContext) return;
    
    try {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      this.audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
    } catch (error) {
      console.error("Error loading audio:", error);
      throw error;
    }
  }
  
  applyEffect(effectType: 'echo' | 'reverb' | 'pitch' | 'none', value: number = 0): void {
    if (!this.audioContext || !this.audioBuffer) return;
    
    // Reset any previous source
    if (this.source) {
      this.source.stop();
      this.source.disconnect();
    }
    
    // Create new source and connect basic gain node
    this.source = this.audioContext.createBufferSource();
    this.source.buffer = this.audioBuffer;
    
    this.gainNode = this.audioContext.createGain();
    
    // Apply effects based on type
    if (effectType === 'echo') {
      const delay = this.audioContext.createDelay();
      delay.delayTime.value = value;
      
      const feedback = this.audioContext.createGain();
      feedback.gain.value = 0.5;
      
      this.source.connect(this.gainNode);
      this.gainNode.connect(this.audioContext.destination);
      
      this.gainNode.connect(delay);
      delay.connect(feedback);
      feedback.connect(delay);
      delay.connect(this.audioContext.destination);
    } else if (effectType === 'reverb') {
      // For demo purposes - simple lowpass filter to simulate reverb
      const lowpass = this.audioContext.createBiquadFilter();
      lowpass.type = 'lowpass';
      lowpass.frequency.value = 1000 * value;
      
      this.source.connect(lowpass);
      lowpass.connect(this.gainNode);
      this.gainNode.connect(this.audioContext.destination);
    } else if (effectType === 'pitch') {
      // Adjust playback rate for pitch shift
      this.source.playbackRate.value = Math.max(0.5, Math.min(2, value));
      this.source.connect(this.gainNode);
      this.gainNode.connect(this.audioContext.destination);
    } else {
      // No effect
      this.source.connect(this.gainNode);
      this.gainNode.connect(this.audioContext.destination);
    }
  }
  
  play(): void {
    if (!this.source || this.isPlaying) return;
    
    this.source.start();
    this.isPlaying = true;
    
    this.source.onended = () => {
      this.isPlaying = false;
    };
  }
  
  stop(): void {
    if (!this.source || !this.isPlaying) return;
    
    this.source.stop();
    this.isPlaying = false;
  }
  
  setVolume(volume: number): void {
    if (!this.gainNode) return;
    
    this.gainNode.gain.value = Math.max(0, Math.min(1, volume));
  }
}

// Simple demo voice generator
const generateVoice = (text: string, voice: string): string => {
  // In a real app, this would call a TTS API
  // For the demo, we'll use some sample audio files based on the voice selection
  const sampleAudios = {
    'emma': "https://audio-samples.github.io/samples/mp3/blizzard_biased/sample-4.mp3",
    'jackson': "https://audio-samples.github.io/samples/mp3/blizzard_primed/sample-0.mp3",
    'olivia': "https://audio-samples.github.io/samples/mp3/blizzard_primed/sample-2.mp3",
    'noah': "https://audio-samples.github.io/samples/mp3/blizzard_narrative/sample-1.mp3",
    'yuki': "https://audio-samples.github.io/samples/mp3/blizzard_biased/sample-1.mp3"
  };
  
  return sampleAudios[voice as keyof typeof sampleAudios] || sampleAudios.emma;
};

export default function Voice() {
  const [text, setText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [generatedAudio, setGeneratedAudio] = useState<string | null>(null);
  const [voice, setVoice] = useState("emma");
  const [stability, setStability] = useState([75]);
  const [clarity, setClarity] = useState([85]);
  const [pitch, setPitch] = useState([50]);
  const [speed, setSpeed] = useState([50]);
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeechToText, setIsSpeechToText] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState<string | null>(null);
  const [transcription, setTranscription] = useState("");
  const [interimTranscription, setInterimTranscription] = useState("");
  const [audioEffect, setAudioEffect] = useState<'none' | 'echo' | 'reverb' | 'pitch'>('none');
  const [visualizationData, setVisualizationData] = useState<number[]>([]);
  const [browserVoices, setBrowserVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedBrowserVoice, setSelectedBrowserVoice] = useState<SpeechSynthesisVoice | null>(null);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const recordedAudioRef = useRef<HTMLAudioElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioRecorder = useRef<AudioRecorder>(new AudioRecorder());
  const speechToText = useRef<SpeechToText>(new SpeechToText());
  const voiceSynthesizer = useRef<VoiceSynthesizer>(new VoiceSynthesizer());
  const voiceEffectsProcessor = useRef<VoiceEffectsProcessor>(new VoiceEffectsProcessor());
  
  const { toast } = useToast();
  
  useEffect(() => {
    // Initialize voice synthesizer
    const voices = voiceSynthesizer.current.getVoices();
    setBrowserVoices(voices);
    if (voices.length > 0) {
      setSelectedBrowserVoice(voices[0]);
    }
    
    // Clean up on unmount
    return () => {
      if (isRecording) {
        audioRecorder.current.stop();
      }
      if (isSpeechToText) {
        speechToText.current.stop();
      }
      if (isPlaying && audioRef.current) {
        audioRef.current.pause();
      }
      voiceSynthesizer.current.stop();
      voiceEffectsProcessor.current.stop();
    };
  }, []);
  
  useEffect(() => {
    if (recordedAudio && recordedAudioRef.current) {
      recordedAudioRef.current.load();
    }
  }, [recordedAudio]);
  
  useEffect(() => {
    if (canvasRef.current && visualizationData.length > 0) {
      drawVisualization();
    }
  }, [visualizationData]);
  
  const drawVisualization = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw visualization
    ctx.fillStyle = '#8B5CF6';
    
    const barWidth = (width / visualizationData.length) * 2.5;
    let x = 0;
    
    for (let i = 0; i < visualizationData.length; i++) {
      const barHeight = (visualizationData[i] / 255) * height;
      
      ctx.fillRect(x, height - barHeight, barWidth, barHeight);
      
      x += barWidth + 1;
    }
  };
  
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
    
    // Simulate API call delay
    setTimeout(() => {
      // Generate voice using our demo function
      const audioUrl = generateVoice(text, voice);
      setGeneratedAudio(audioUrl);
      setIsGenerating(false);
      
      toast({
        title: "Voice generated",
        description: "Your text has been converted to speech.",
      });
      
      // Load audio for effects processing
      voiceEffectsProcessor.current.loadAudio(audioUrl);
    }, 1500);
  };
  
  const handlePlay = () => {
    if (generatedAudio) {
      if (isPlaying) {
        if (audioRef.current) {
          audioRef.current.pause();
        }
        voiceSynthesizer.current.stop();
        voiceEffectsProcessor.current.stop();
      } else {
        if (audioEffect === 'none') {
          if (audioRef.current) {
            audioRef.current.play();
          }
        } else {
          voiceEffectsProcessor.current.applyEffect(
            audioEffect, 
            audioEffect === 'pitch' ? speed[0] / 50 : 
            audioEffect === 'echo' ? clarity[0] / 100 : 
            stability[0] / 100
          );
          voiceEffectsProcessor.current.play();
        }
      }
      setIsPlaying(!isPlaying);
    } else if (text.trim() && browserVoices.length > 0) {
      // Use browser's speech synthesis
      if (isPlaying) {
        voiceSynthesizer.current.stop();
      } else {
        const rate = speed[0] / 50;  // Convert to range around 1
        const pitchValue = pitch[0] / 50;  // Convert to range around 1
        voiceSynthesizer.current.speak(text, selectedBrowserVoice, rate, pitchValue);
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
    setPitch([50]);
    setSpeed([50]);
    setAudioEffect('none');
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    voiceSynthesizer.current.stop();
    voiceEffectsProcessor.current.stop();
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
  
  const startRecording = async () => {
    try {
      await audioRecorder.current.start((dataArray) => {
        // Update visualization data
        setVisualizationData(Array.from(dataArray));
      });
      setIsRecording(true);
      
      toast({
        title: "Recording started",
        description: "Speak now. Click stop when finished.",
      });
    } catch (error) {
      console.error("Error starting recording:", error);
      toast({
        title: "Recording error",
        description: "Could not access your microphone. Please check permissions.",
        variant: "destructive",
      });
    }
  };
  
  const stopRecording = async () => {
    try {
      const audioUrl = await audioRecorder.current.stop();
      setRecordedAudio(audioUrl);
      setIsRecording(false);
      setVisualizationData([]);
      
      toast({
        title: "Recording stopped",
        description: "Your recording is ready to play.",
      });
      
      // Simulate transcription by generating placeholder text
      setTimeout(() => {
        const placeholderText = "This is a transcription of your speech. In a real application, this would use a speech-to-text API to convert your audio to text with high accuracy across multiple languages.";
        setText(placeholderText);
      }, 1000);
      
    } catch (error) {
      console.error("Error stopping recording:", error);
      setIsRecording(false);
    }
  };
  
  const startSpeechToText = () => {
    setIsSpeechToText(true);
    setInterimTranscription("");
    
    speechToText.current.start(
      (text, isFinal) => {
        if (isFinal) {
          setTranscription((prev) => prev + " " + text);
          setInterimTranscription("");
          setText((prev) => prev + " " + text);
        } else {
          setInterimTranscription(text);
        }
      },
      () => {
        setIsSpeechToText(false);
      }
    );
    
    toast({
      title: "Speech recognition started",
      description: "Start speaking. Your words will appear as text.",
    });
  };
  
  const stopSpeechToText = () => {
    speechToText.current.stop();
    setIsSpeechToText(false);
    
    if (interimTranscription) {
      setText((prev) => prev + " " + interimTranscription);
      setInterimTranscription("");
    }
    
    toast({
      title: "Speech recognition stopped",
      description: "Your speech has been converted to text.",
    });
  };
  
  const handleVoiceEffect = (effect: 'none' | 'echo' | 'reverb' | 'pitch') => {
    setAudioEffect(effect);
    
    if (isPlaying) {
      voiceEffectsProcessor.current.stop();
      setIsPlaying(false);
      
      // Apply new effect
      setTimeout(() => {
        if (generatedAudio) {
          voiceEffectsProcessor.current.applyEffect(
            effect, 
            effect === 'pitch' ? speed[0] / 50 : 
            effect === 'echo' ? clarity[0] / 100 : 
            stability[0] / 100
          );
          voiceEffectsProcessor.current.play();
          setIsPlaying(true);
        }
      }, 300);
    }
    
    toast({
      title: `${effect === 'none' ? 'No effect' : effect.charAt(0).toUpperCase() + effect.slice(1) + ' effect'} applied`,
      description: effect === 'none' ? "Playing original audio without effects" : `Audio will be processed with ${effect} effect.`,
    });
  };
  
  const playBrowserTTS = () => {
    if (!text.trim()) return;
    
    const rate = speed[0] / 50;  // Convert to range around 1
    const pitchValue = pitch[0] / 50;  // Convert to range around 1
    
    if (isPlaying) {
      voiceSynthesizer.current.stop();
      setIsPlaying(false);
    } else {
      voiceSynthesizer.current.speak(text, selectedBrowserVoice, rate, pitchValue);
      setIsPlaying(true);
      
      // Check if still speaking every 100ms
      const checkInterval = setInterval(() => {
        if (!voiceSynthesizer.current.isSpeaking()) {
          setIsPlaying(false);
          clearInterval(checkInterval);
        }
      }, 100);
    }
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
              <div className="mb-6 border border-border rounded-md overflow-hidden">
                <div className="bg-muted py-2 px-4 border-b border-border">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-medium">Audio Input & Visualization</h3>
                    <div className="flex gap-2">
                      {isSpeechToText ? (
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={stopSpeechToText}
                        >
                          Stop Listening
                          <MicOff className="ml-2 h-4 w-4" />
                        </Button>
                      ) : (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={startSpeechToText}
                        >
                          Speech to Text
                          <Mic className="ml-2 h-4 w-4" />
                        </Button>
                      )}
                      
                      {isRecording ? (
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={stopRecording}
                        >
                          Stop Recording
                          <MicOff className="ml-2 h-4 w-4" />
                        </Button>
                      ) : (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={startRecording}
                        >
                          Record Audio
                          <Mic className="ml-2 h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <canvas 
                    ref={canvasRef} 
                    width={700} 
                    height={100} 
                    className="w-full h-24 bg-background border border-border rounded-md"
                  />
                  
                  {isSpeechToText && interimTranscription && (
                    <div className="mt-2 p-2 bg-primary/10 rounded-md">
                      <p className="text-sm italic">{interimTranscription}</p>
                    </div>
                  )}
                  
                  {recordedAudio && (
                    <div className="mt-4">
                      <Label>Your Recording</Label>
                      <audio ref={recordedAudioRef} src={recordedAudio} controls className="w-full mt-2" />
                    </div>
                  )}
                </div>
              </div>
              
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
                    
                    {browserVoices.length > 0 && (
                      <div className="mt-4">
                        <Label htmlFor="browserVoice">Browser Voice (Instant Testing)</Label>
                        <Select 
                          value={selectedBrowserVoice?.name || ""} 
                          onValueChange={(value) => {
                            const voice = browserVoices.find(v => v.name === value) || null;
                            setSelectedBrowserVoice(voice);
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select browser voice" />
                          </SelectTrigger>
                          <SelectContent>
                            {browserVoices.map((voice) => (
                              <SelectItem key={voice.name} value={voice.name}>
                                {voice.name} ({voice.lang})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="sm" 
                          className="mt-2"
                          onClick={playBrowserTTS}
                        >
                          {isPlaying ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
                          Test with Browser Voice
                        </Button>
                      </div>
                    )}
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
                    
                    <div className="flex justify-between">
                      <Label htmlFor="pitch">Pitch</Label>
                      <span className="text-sm text-muted-foreground">{pitch[0] < 50 ? "Lower" : pitch[0] > 50 ? "Higher" : "Normal"}</span>
                    </div>
                    <Slider
                      id="pitch"
                      min={0}
                      max={100}
                      step={1}
                      value={pitch}
                      onValueChange={setPitch}
                    />
                    
                    <div className="flex justify-between">
                      <Label htmlFor="speed">Speed</Label>
                      <span className="text-sm text-muted-foreground">{speed[0] < 50 ? "Slower" : speed[0] > 50 ? "Faster" : "Normal"}</span>
                    </div>
                    <Slider
                      id="speed"
                      min={0}
                      max={100}
                      step={1}
                      value={speed}
                      onValueChange={setSpeed}
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
                <CardDescription>
                  Apply effects and listen to your generated audio
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <audio 
                  ref={audioRef} 
                  src={generatedAudio} 
                  onEnded={handleAudioEnded} 
                  className="w-full" 
                />
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">
                  <Button 
                    variant={audioEffect === 'none' ? "default" : "outline"} 
                    size="sm"
                    onClick={() => handleVoiceEffect('none')}
                  >
                    <Wand2 className="mr-2 h-4 w-4" /> No Effect
                  </Button>
                  <Button 
                    variant={audioEffect === 'echo' ? "default" : "outline"} 
                    size="sm"
                    onClick={() => handleVoiceEffect('echo')}
                  >
                    <Wand2 className="mr-2 h-4 w-4" /> Echo
                  </Button>
                  <Button 
                    variant={audioEffect === 'reverb' ? "default" : "outline"} 
                    size="sm"
                    onClick={() => handleVoiceEffect('reverb')}
                  >
                    <Wand2 className="mr-2 h-4 w-4" /> Reverb
                  </Button>
                  <Button 
                    variant={audioEffect === 'pitch' ? "default" : "outline"} 
                    size="sm"
                    onClick={() => handleVoiceEffect('pitch')}
                  >
                    <Wand2 className="mr-2 h-4 w-4" /> Pitch Shift
                  </Button>
                </div>
                
                <div className="bg-muted rounded-md p-4 mt-4">
                  <p className="text-sm text-center italic">
                    "{text.length > 100 ? text.slice(0, 100) + "..." : text}"
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex flex-wrap gap-2">
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
                <Button variant="outline" onClick={() => window.open('/content-generator', '_blank')}>
                  <FileText className="mr-2 h-4 w-4" /> Content Generator <MoveUpRight className="ml-1 h-3 w-3" />
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
                    <Music className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-medium mb-2">Voice Effects</h3>
                  <p className="text-sm text-muted-foreground">
                    Customize audio with effects like echo, reverb, and pitch shifting
                  </p>
                </div>
                
                <div className="flex flex-col items-center text-center p-4">
                  <div className="bg-primary/10 p-3 rounded-full mb-4">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-medium mb-2">Speech-to-Text</h3>
                  <p className="text-sm text-muted-foreground">
                    Convert your voice to text with high accuracy for editing
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
