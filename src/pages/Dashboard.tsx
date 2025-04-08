
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell } from "recharts";
import { ArrowUpRight, MessagesSquare, FileText, Volume2, RefreshCw, UserRound, Settings, Clock, Sparkles, Flame, Download, AlertCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";

const activityData = [
  { name: "Mon", chat: 5, content: 2, voice: 1 },
  { name: "Tue", chat: 7, content: 4, voice: 2 },
  { name: "Wed", chat: 10, content: 6, voice: 3 },
  { name: "Thu", chat: 8, content: 5, voice: 2 },
  { name: "Fri", chat: 12, content: 7, voice: 4 },
  { name: "Sat", chat: 6, content: 3, voice: 1 },
  { name: "Sun", chat: 4, content: 2, voice: 0 },
];

const usageData = [
  { name: "Chat", value: 45, color: "#8B5CF6" },
  { name: "Content", value: 30, color: "#EC4899" },
  { name: "Voice", value: 15, color: "#3B82F6" },
  { name: "Other", value: 10, color: "#10B981" },
];

const recentActivity = [
  {
    id: 1,
    type: "chat",
    title: "AI Assistant Chat",
    description: "15 messages conversation about marketing strategies",
    timestamp: "2 hours ago",
    icon: <MessagesSquare className="h-4 w-4" />,
  },
  {
    id: 2,
    type: "content",
    title: "Blog Post Generated",
    description: "\"10 Ways to Improve Your Productivity with AI\"",
    timestamp: "5 hours ago",
    icon: <FileText className="h-4 w-4" />,
  },
  {
    id: 3,
    type: "voice",
    title: "Voice Generation",
    description: "Product announcement script converted to audio",
    timestamp: "Yesterday",
    icon: <Volume2 className="h-4 w-4" />,
  },
  {
    id: 4,
    type: "chat",
    title: "AI Assistant Chat",
    description: "Technical support conversation about API integration",
    timestamp: "2 days ago",
    icon: <MessagesSquare className="h-4 w-4" />,
  },
];

// Sample analytics data
const generateAnalyticsData = (days: number) => {
  const data = [];
  const now = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(now.getDate() - i);
    
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      chat: Math.round(Math.random() * 20),
      content: Math.round(Math.random() * 15),
      voice: Math.round(Math.random() * 8),
    });
  }
  
  return data;
};

export default function Dashboard() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [analyticsData, setAnalyticsData] = useState(generateAnalyticsData(7));
  const [usageReport, setUsageReport] = useState<null | string>(null);
  const [showSettings, setShowSettings] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      // Generate new random data
      setAnalyticsData(generateAnalyticsData(7));
      setIsRefreshing(false);
      
      toast({
        title: "Dashboard refreshed",
        description: "Latest data has been loaded.",
      });
    }, 1000);
  };
  
  const handleUpgrade = () => {
    navigate("/pricing");
  };
  
  const handleSettings = () => {
    setShowSettings(!showSettings);
    
    if (!showSettings) {
      toast({
        title: "Settings panel opened",
        description: "Adjust your dashboard preferences here.",
      });
    }
  };
  
  const handleDownloadReport = () => {
    // In a real app, this would generate and download a report
    setUsageReport("Generating report...");
    
    setTimeout(() => {
      setUsageReport(null);
      
      // Create a simple CSV
      const csvContent = "date,chat,content,voice\n" + 
        analyticsData.map(day => `${day.date},${day.chat},${day.content},${day.voice}`).join("\n");
      
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", "usage_report.csv");
      link.click();
      
      toast({
        title: "Report downloaded",
        description: "Your usage report has been downloaded as a CSV file.",
      });
    }, 1500);
  };
  
  const handleNavigateToFeature = (path: string) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">
              Monitor your AI usage and activity
            </p>
          </div>
          
          <div className="flex items-center mt-4 md:mt-0 gap-2">
            <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
              {isRefreshing ? (
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4 mr-2" />
              )}
              Refresh
            </Button>
            <Button variant="outline" size="sm" onClick={handleSettings}>
              <Settings className="h-4 w-4 mr-2" /> Settings
            </Button>
            <Button size="sm" onClick={handleUpgrade}>
              <Sparkles className="h-4 w-4 mr-2" /> Upgrade Plan
            </Button>
          </div>
        </div>
        
        {showSettings && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Dashboard Settings</CardTitle>
              <CardDescription>Customize your dashboard appearance and data preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Button variant="outline" className="w-full" onClick={() => setShowSettings(false)}>
                    Hide Settings Panel
                  </Button>
                </div>
                <div>
                  <Button variant="outline" className="w-full" onClick={handleDownloadReport}>
                    <Download className="h-4 w-4 mr-2" /> Export Data
                  </Button>
                </div>
                <div>
                  <Button variant="outline" className="w-full" onClick={() => {
                    toast({
                      title: "Alert settings",
                      description: "Set up email notifications for important events",
                    });
                  }}>
                    <AlertCircle className="h-4 w-4 mr-2" /> Alert Settings
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
        {usageReport && (
          <Card className="mb-6">
            <CardContent className="py-4">
              <div className="flex items-center justify-center">
                <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                <span>{usageReport}</span>
              </div>
            </CardContent>
          </Card>
        )}
        
        <div className="grid gap-4 md:grid-cols-3 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Credits Remaining
              </CardTitle>
              <Flame className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,500 / 10,000</div>
              <p className="text-xs text-muted-foreground">
                Plan renews in 18 days
              </p>
              <Progress value={25} className="mt-3 h-2" />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Active Sessions
              </CardTitle>
              <UserRound className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">
                Across 2 devices
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Last Activity
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2h 15m ago</div>
              <p className="text-xs text-muted-foreground">
                AI Chat session
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="overview" className="mb-6" value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="usage">Usage</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-4 space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle>Weekly Activity</CardTitle>
                  <CardDescription>
                    Your AI usage over the past week
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-2">
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={analyticsData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line 
                          type="monotone" 
                          dataKey="chat" 
                          name="AI Chat" 
                          stroke="#8B5CF6" 
                          strokeWidth={2} 
                          dot={{ r: 4 }} 
                        />
                        <Line 
                          type="monotone" 
                          dataKey="content" 
                          name="Content Generation" 
                          stroke="#EC4899" 
                          strokeWidth={2} 
                          dot={{ r: 4 }} 
                        />
                        <Line 
                          type="monotone" 
                          dataKey="voice" 
                          name="Voice Generation" 
                          stroke="#3B82F6" 
                          strokeWidth={2} 
                          dot={{ r: 4 }} 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Usage Breakdown</CardTitle>
                  <CardDescription>
                    Distribution of your AI usage
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[230px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={usageData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {usageData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    Your latest interactions with AI
                  </CardDescription>
                </CardHeader>
                <CardContent className="max-h-[230px] overflow-auto">
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div 
                        key={activity.id} 
                        className="flex items-start gap-3 cursor-pointer hover:bg-muted/50 p-2 rounded-md"
                        onClick={() => {
                          const path = activity.type === "chat" 
                            ? "/chat" 
                            : activity.type === "content" 
                              ? "/content-generator" 
                              : "/voice";
                          handleNavigateToFeature(path);
                        }}
                      >
                        <div className={`mt-1 p-1.5 rounded-lg bg-${
                          activity.type === "chat" ? "primary" : 
                          activity.type === "content" ? "rose-500" : "blue-500"
                        }/10`}>
                          {activity.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium">{activity.title}</h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            {activity.description}
                          </p>
                          <span className="text-xs text-muted-foreground mt-1 block">
                            {activity.timestamp}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="activity" className="mt-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Activity Log</CardTitle>
                  <CardDescription>
                    Detailed log of your AI interactions
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={handleDownloadReport}>
                  <Download className="h-4 w-4 mr-2" /> Export
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.map((day, index) => (
                    <div key={index} className="border-b border-border pb-3 last:border-0">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">{day.date}</h3>
                        <Badge variant="outline">{day.chat + day.content + day.voice} activities</Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div className="flex items-center gap-1">
                          <MessagesSquare className="h-3 w-3" /> Chat: {day.chat}
                        </div>
                        <div className="flex items-center gap-1">
                          <FileText className="h-3 w-3" /> Content: {day.content}
                        </div>
                        <div className="flex items-center gap-1">
                          <Volume2 className="h-3 w-3" /> Voice: {day.voice}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="usage" className="mt-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Usage Analytics</CardTitle>
                  <CardDescription>
                    Detailed usage statistics and analytics
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={handleDownloadReport}>
                  <Download className="h-4 w-4 mr-2" /> Export Report
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="py-3">
                        <CardTitle className="text-sm">Total API Calls</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">2,451</div>
                        <Progress value={45} className="mt-3 h-2" />
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="py-3">
                        <CardTitle className="text-sm">Content Generation</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">876</div>
                        <Progress value={30} className="mt-3 h-2" />
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="py-3">
                        <CardTitle className="text-sm">Voice Minutes</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">324</div>
                        <Progress value={15} className="mt-3 h-2" />
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="font-medium mb-3">Feature Quick Access</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <Button 
                        variant="outline" 
                        className="h-auto py-4 flex flex-col gap-2 items-center"
                        onClick={() => handleNavigateToFeature('/chat')}
                      >
                        <MessagesSquare className="h-6 w-6" />
                        <span>AI Chat</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        className="h-auto py-4 flex flex-col gap-2 items-center"
                        onClick={() => handleNavigateToFeature('/content-generator')}
                      >
                        <FileText className="h-6 w-6" />
                        <span>Content Generator</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        className="h-auto py-4 flex flex-col gap-2 items-center"
                        onClick={() => handleNavigateToFeature('/voice')}
                      >
                        <Volume2 className="h-6 w-6" />
                        <span>Voice Generator</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleNavigateToFeature('/chat')}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                AI Chat Usage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,245</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
              <div className="mt-4 h-[60px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={activityData}>
                    <Bar dataKey="chat" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleNavigateToFeature('/content-generator')}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Content Generated
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">876</div>
              <p className="text-xs text-muted-foreground">
                +12.3% from last month
              </p>
              <div className="mt-4 h-[60px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={activityData}>
                    <Bar dataKey="content" fill="#EC4899" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleNavigateToFeature('/voice')}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Audio Minutes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">324</div>
              <p className="text-xs text-muted-foreground">
                +5.7% from last month
              </p>
              <div className="mt-4 h-[60px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={activityData}>
                    <Bar dataKey="voice" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleNavigateToFeature('/pricing')}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Subscription
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div className="text-xl font-bold">Pro Plan</div>
                <Badge>Active</Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Renews on May 15, 2025
              </p>
              <Button variant="link" className="mt-4 h-auto p-0 text-primary">
                Manage Subscription <ArrowUpRight className="ml-1 h-3 w-3" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
