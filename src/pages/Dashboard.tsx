
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from "recharts";
import { ArrowUpRight, MessageSquare, FileText, Volume2, Clock, Zap, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const usageData = [
  { name: "Mon", chat: 45, content: 30, voice: 15 },
  { name: "Tue", chat: 50, content: 25, voice: 20 },
  { name: "Wed", chat: 35, content: 45, voice: 25 },
  { name: "Thu", chat: 65, content: 35, voice: 30 },
  { name: "Fri", chat: 75, content: 55, voice: 20 },
  { name: "Sat", chat: 60, content: 40, voice: 10 },
  { name: "Sun", chat: 40, content: 30, voice: 5 },
];

const performanceData = [
  { name: "Speed", value: 85 },
  { name: "Accuracy", value: 90 },
  { name: "Quality", value: 75 },
  { name: "Consistency", value: 80 },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold">AI Analytics Dashboard</h1>
              <p className="text-foreground/70 mt-1">
                Track and analyze your AI tool usage and performance
              </p>
            </div>
            <Button variant="outline" className="flex items-center">
              <Zap className="h-4 w-4 mr-2" /> Upgrade Plan
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Total AI Chat Messages</CardDescription>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-2xl">1,254</CardTitle>
                  <MessageSquare className="h-4 w-4 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm">
                  <ArrowUpRight className="h-4 w-4 mr-1 text-green-500" />
                  <span className="text-green-500 font-medium">+12%</span>
                  <span className="ml-1 text-foreground/70">from last week</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Content Generated</CardDescription>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-2xl">428</CardTitle>
                  <FileText className="h-4 w-4 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm">
                  <ArrowUpRight className="h-4 w-4 mr-1 text-green-500" />
                  <span className="text-green-500 font-medium">+8%</span>
                  <span className="ml-1 text-foreground/70">from last week</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Voice Minutes Generated</CardDescription>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-2xl">96</CardTitle>
                  <Volume2 className="h-4 w-4 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm">
                  <ArrowUpRight className="h-4 w-4 mr-1 text-green-500" />
                  <span className="text-green-500 font-medium">+18%</span>
                  <span className="ml-1 text-foreground/70">from last week</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Average Response Time</CardDescription>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-2xl">1.8s</CardTitle>
                  <Clock className="h-4 w-4 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm">
                  <ArrowUpRight className="h-4 w-4 mr-1 text-green-500 rotate-180" />
                  <span className="text-green-500 font-medium">-0.3s</span>
                  <span className="ml-1 text-foreground/70">from last week</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Weekly AI Usage</CardTitle>
                <CardDescription>
                  Usage trends across different AI tools
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={usageData}
                    margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--background))', 
                        borderColor: 'hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="chat"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      activeDot={{ r: 8 }}
                      name="AI Chat"
                    />
                    <Line
                      type="monotone"
                      dataKey="content"
                      stroke="hsl(var(--secondary))"
                      strokeWidth={2}
                      name="Content Gen"
                    />
                    <Line
                      type="monotone"
                      dataKey="voice"
                      stroke="hsl(var(--accent))"
                      strokeWidth={2}
                      name="Voice Gen"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>AI Performance</CardTitle>
                <CardDescription>
                  Performance metrics for your AI tools
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={performanceData}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis dataKey="name" type="category" />
                    <Tooltip
                      formatter={(value) => [`${value}%`, 'Score']}
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--background))', 
                        borderColor: 'hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="value" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent AI Sessions</CardTitle>
                <CardDescription>
                  Your latest interactions with AI tools
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { type: "chat", title: "Marketing Strategy Discussion", time: "2 hours ago" },
                    { type: "content", title: "Blog Post: Future of AI", time: "Yesterday" },
                    { type: "voice", title: "Product Announcement Script", time: "2 days ago" },
                    { type: "chat", title: "Customer Service Training", time: "3 days ago" },
                  ].map((session, index) => (
                    <div 
                      key={index} 
                      className="flex justify-between items-center p-3 rounded-md hover:bg-muted transition-colors"
                    >
                      <div className="flex items-center">
                        {session.type === "chat" && (
                          <MessageSquare className="h-4 w-4 mr-3 text-primary" />
                        )}
                        {session.type === "content" && (
                          <FileText className="h-4 w-4 mr-3 text-secondary" />
                        )}
                        {session.type === "voice" && (
                          <Volume2 className="h-4 w-4 mr-3 text-accent" />
                        )}
                        <div>
                          <p className="font-medium">{session.title}</p>
                          <p className="text-xs text-foreground/60">{session.time}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">View</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Popular AI Templates</CardTitle>
                <CardDescription>
                  Most frequently used templates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Social Media Post", uses: 32, category: "Content" },
                    { name: "Customer Response", uses: 28, category: "Chat" },
                    { name: "Product Description", uses: 24, category: "Content" },
                    { name: "Podcast Intro", uses: 18, category: "Voice" },
                  ].map((template, index) => (
                    <div 
                      key={index} 
                      className="flex justify-between items-center p-3 rounded-md hover:bg-muted transition-colors"
                    >
                      <div>
                        <div className="flex items-center">
                          <p className="font-medium">{template.name}</p>
                          <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary">
                            {template.category}
                          </span>
                        </div>
                        <p className="text-xs text-foreground/60">{template.uses} uses this month</p>
                      </div>
                      <Button variant="ghost" size="sm">Use</Button>
                    </div>
                  ))}
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
