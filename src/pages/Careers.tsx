
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface JobListing {
  id: number;
  title: string;
  department: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Remote";
  description: string;
  postedDate: string;
}

const jobListings: JobListing[] = [
  {
    id: 1,
    title: "AI Research Scientist",
    department: "Research & Development",
    location: "San Francisco, CA (Remote Option)",
    type: "Full-time",
    description: "Join our R&D team to push the boundaries of AI and develop next-generation language models tailored for Gen Z users.",
    postedDate: "April 3, 2025"
  },
  {
    id: 2,
    title: "Frontend Developer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    description: "Create engaging, responsive user interfaces for our AI platform using React, TypeScript, and modern web technologies.",
    postedDate: "April 2, 2025"
  },
  {
    id: 3,
    title: "UX/UI Designer",
    department: "Design",
    location: "San Francisco, CA",
    type: "Full-time",
    description: "Design intuitive, engaging experiences for our AI tools that resonate with Gen Z users and creators.",
    postedDate: "March 30, 2025"
  },
  {
    id: 4,
    title: "AI Product Manager",
    department: "Product",
    location: "San Francisco, CA (Remote Option)",
    type: "Full-time",
    description: "Lead the development of AI products from conception to launch, working with cross-functional teams to deliver exceptional user experiences.",
    postedDate: "March 28, 2025"
  },
  {
    id: 5,
    title: "Content Marketing Specialist",
    department: "Marketing",
    location: "Remote",
    type: "Full-time",
    description: "Create compelling content that showcases our AI capabilities and engages our Gen Z audience across various platforms.",
    postedDate: "March 25, 2025"
  },
  {
    id: 6,
    title: "Backend Engineer",
    department: "Engineering",
    location: "San Francisco, CA (Remote Option)",
    type: "Full-time",
    description: "Build scalable, secure backend systems for our AI platform using modern technologies and cloud infrastructure.",
    postedDate: "March 23, 2025"
  },
  {
    id: 7,
    title: "AI Implementation Consultant",
    department: "Customer Success",
    location: "Remote",
    type: "Contract",
    description: "Help our clients successfully implement and maximize value from our AI solutions through technical guidance and best practices.",
    postedDate: "March 20, 2025"
  },
  {
    id: 8,
    title: "Data Engineer",
    department: "Engineering",
    location: "San Francisco, CA",
    type: "Full-time",
    description: "Design and implement data pipelines that feed our AI models, ensuring high quality and efficient data processing.",
    postedDate: "March 18, 2025"
  }
];

export default function Careers() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 px-4 bg-gradient-to-b from-background to-background/80">
          <div className="container mx-auto text-center max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent mb-6">
              Join the GenZify Team
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Help us build the future of AI for the next generation. We're looking for passionate individuals who are excited about creating innovative AI solutions.
            </p>
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              View Open Positions
            </Button>
          </div>
        </section>
        
        {/* Values Section */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-card/60 backdrop-blur-sm border-primary/20">
                <CardHeader>
                  <CardTitle className="text-xl">Innovation First</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We push boundaries and think outside the box. We're not afraid to challenge conventional wisdom and try new approaches.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-card/60 backdrop-blur-sm border-secondary/20">
                <CardHeader>
                  <CardTitle className="text-xl">Inclusive Technology</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We believe AI should be accessible to everyone. We strive to create technology that is inclusive, fair, and beneficial for all users.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-card/60 backdrop-blur-sm border-accent/20">
                <CardHeader>
                  <CardTitle className="text-xl">User-Centric Design</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Our users are at the heart of everything we do. We obsess over creating exceptional experiences that delight and empower.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Open Positions Section */}
        <section className="py-16 px-4" id="open-positions">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Open Positions</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Join our team of innovators and help shape the future of AI technology for Generation Z.
              </p>
            </div>
            
            <Tabs defaultValue="all" className="mb-8">
              <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-4 md:grid-cols-5 h-auto">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="engineering">Engineering</TabsTrigger>
                <TabsTrigger value="design">Design</TabsTrigger>
                <TabsTrigger value="product">Product</TabsTrigger>
                <TabsTrigger value="marketing">Marketing</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-6">
                <div className="grid gap-4">
                  {jobListings.map((job) => (
                    <Card key={job.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <div className="flex flex-wrap justify-between items-start gap-2">
                          <div>
                            <CardTitle>{job.title}</CardTitle>
                            <CardDescription className="mt-1">{job.department} • {job.location}</CardDescription>
                          </div>
                          <Badge variant={job.type === "Remote" ? "outline" : "default"} className="mt-1">
                            {job.type}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-4">
                        <p className="text-muted-foreground">{job.description}</p>
                      </CardContent>
                      <CardFooter className="flex justify-between border-t pt-4">
                        <span className="text-sm text-muted-foreground">Posted: {job.postedDate}</span>
                        <Button size="sm" variant="secondary">View Details</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="engineering" className="mt-6">
                <div className="grid gap-4">
                  {jobListings
                    .filter(job => job.department === "Engineering")
                    .map((job) => (
                      <Card key={job.id} className="overflow-hidden hover:shadow-md transition-shadow">
                        <CardHeader className="pb-2">
                          <div className="flex flex-wrap justify-between items-start gap-2">
                            <div>
                              <CardTitle>{job.title}</CardTitle>
                              <CardDescription className="mt-1">{job.department} • {job.location}</CardDescription>
                            </div>
                            <Badge variant={job.type === "Remote" ? "outline" : "default"} className="mt-1">
                              {job.type}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="pb-4">
                          <p className="text-muted-foreground">{job.description}</p>
                        </CardContent>
                        <CardFooter className="flex justify-between border-t pt-4">
                          <span className="text-sm text-muted-foreground">Posted: {job.postedDate}</span>
                          <Button size="sm" variant="secondary">View Details</Button>
                        </CardFooter>
                      </Card>
                    ))}
                </div>
              </TabsContent>
              
              {/* Similar TabsContent for other departments */}
              <TabsContent value="design" className="mt-6">
                <div className="grid gap-4">
                  {jobListings
                    .filter(job => job.department === "Design")
                    .map((job) => (
                      <Card key={job.id} className="overflow-hidden hover:shadow-md transition-shadow">
                        <CardHeader className="pb-2">
                          <div className="flex flex-wrap justify-between items-start gap-2">
                            <div>
                              <CardTitle>{job.title}</CardTitle>
                              <CardDescription className="mt-1">{job.department} • {job.location}</CardDescription>
                            </div>
                            <Badge variant={job.type === "Remote" ? "outline" : "default"} className="mt-1">
                              {job.type}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="pb-4">
                          <p className="text-muted-foreground">{job.description}</p>
                        </CardContent>
                        <CardFooter className="flex justify-between border-t pt-4">
                          <span className="text-sm text-muted-foreground">Posted: {job.postedDate}</span>
                          <Button size="sm" variant="secondary">View Details</Button>
                        </CardFooter>
                      </Card>
                    ))}
                </div>
              </TabsContent>
              
              <TabsContent value="product" className="mt-6">
                <div className="grid gap-4">
                  {jobListings
                    .filter(job => job.department === "Product")
                    .map((job) => (
                      <Card key={job.id} className="overflow-hidden hover:shadow-md transition-shadow">
                        <CardHeader className="pb-2">
                          <div className="flex flex-wrap justify-between items-start gap-2">
                            <div>
                              <CardTitle>{job.title}</CardTitle>
                              <CardDescription className="mt-1">{job.department} • {job.location}</CardDescription>
                            </div>
                            <Badge variant={job.type === "Remote" ? "outline" : "default"} className="mt-1">
                              {job.type}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="pb-4">
                          <p className="text-muted-foreground">{job.description}</p>
                        </CardContent>
                        <CardFooter className="flex justify-between border-t pt-4">
                          <span className="text-sm text-muted-foreground">Posted: {job.postedDate}</span>
                          <Button size="sm" variant="secondary">View Details</Button>
                        </CardFooter>
                      </Card>
                    ))}
                </div>
              </TabsContent>
              
              <TabsContent value="marketing" className="mt-6">
                <div className="grid gap-4">
                  {jobListings
                    .filter(job => job.department === "Marketing")
                    .map((job) => (
                      <Card key={job.id} className="overflow-hidden hover:shadow-md transition-shadow">
                        <CardHeader className="pb-2">
                          <div className="flex flex-wrap justify-between items-start gap-2">
                            <div>
                              <CardTitle>{job.title}</CardTitle>
                              <CardDescription className="mt-1">{job.department} • {job.location}</CardDescription>
                            </div>
                            <Badge variant={job.type === "Remote" ? "outline" : "default"} className="mt-1">
                              {job.type}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="pb-4">
                          <p className="text-muted-foreground">{job.description}</p>
                        </CardContent>
                        <CardFooter className="flex justify-between border-t pt-4">
                          <span className="text-sm text-muted-foreground">Posted: {job.postedDate}</span>
                          <Button size="sm" variant="secondary">View Details</Button>
                        </CardFooter>
                      </Card>
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
