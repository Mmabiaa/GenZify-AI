
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { careers } from "@/data/careers";
import { Briefcase, MapPin, Building, Users } from "lucide-react";

export default function Careers() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-background to-background/80 border-b">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent mb-4">
                Join the GenZify Team
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Help us build the future of AI for Generation Z. We're looking for innovative thinkers, 
                creators, and problem-solvers who are passionate about making technology more accessible and engaging.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="#openings">
                  <Button size="lg">View Open Positions</Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" size="lg">Contact Recruiting</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Values Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Values</h2>
              <p className="text-muted-foreground">
                These core principles guide everything we do at GenZify
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Inclusive Innovation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We build AI that works for everyone, considering diverse perspectives and needs.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Human-Centered</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Technology should enhance human potential, not replace it. People come first.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Bold Creativity</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We take risks, challenge the status quo, and aren't afraid to reimagine the future.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Ethical Impact</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We consider the broader implications of our work and strive to make a positive difference.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Open Positions Section */}
        <section id="openings" className="py-16 md:py-24 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Open Positions</h2>
              <p className="text-muted-foreground">
                Join our team and help shape the future of AI for Generation Z
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto space-y-6">
              {careers.map((job) => (
                <Card key={job.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle>{job.title}</CardTitle>
                    <CardDescription className="flex flex-col sm:flex-row gap-2 sm:gap-6 mt-2">
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4 text-primary" />
                        <span>{job.type}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-primary" />
                        <span>{job.department}</span>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{job.description}</p>
                  </CardContent>
                  <CardFooter className="border-t bg-background/50 p-4">
                    <Button asChild>
                      <Link to={`/careers/${job.id}`}>Apply Now</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Benefits Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Benefits & Perks</h2>
              <p className="text-muted-foreground">
                We take care of our team so they can focus on creating amazing products
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle>Health & Wellness</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm">• Comprehensive health insurance</p>
                  <p className="text-sm">• Mental health support</p>
                  <p className="text-sm">• Fitness stipend</p>
                  <p className="text-sm">• Generous PTO policy</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Professional Growth</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm">• Learning & development budget</p>
                  <p className="text-sm">• Conference attendance</p>
                  <p className="text-sm">• Mentorship programs</p>
                  <p className="text-sm">• Career advancement paths</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Life at GenZify</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm">• Flexible work arrangements</p>
                  <p className="text-sm">• Home office stipend</p>
                  <p className="text-sm">• Team retreats</p>
                  <p className="text-sm">• Equity in a growing company</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
