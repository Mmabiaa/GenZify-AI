
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Briefcase, MapPin, Building } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { careers } from "@/data/careers";
import { Link } from "react-router-dom";

export default function JobApplication() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { id } = useParams();
  const jobId = parseInt(id || "1");
  
  const job = careers.find(job => job.id === jobId) || careers[0];
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Application submitted!",
      description: "Thank you for applying. We'll review your application and get back to you soon.",
    });
    
    // Simulate form submission delay then navigate
    setTimeout(() => {
      navigate("/thank-you");
    }, 1000);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Button asChild variant="ghost" size="sm" className="mb-6">
            <Link to="/careers" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Careers
            </Link>
          </Button>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">{job.title}</CardTitle>
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
              <div className="prose max-w-none">
                <p className="lead">{job.description}</p>
                <h3>Requirements</h3>
                <ul>
                  {job.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
                <h3>Responsibilities</h3>
                <ul>
                  {job.responsibilities.map((resp, index) => (
                    <li key={index}>{resp}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Apply for {job.title}</CardTitle>
              <CardDescription>
                Submit your application for this position. All fields are required.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="text-sm font-medium">
                      First Name
                    </label>
                    <Input id="firstName" placeholder="Enter your first name" required />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="text-sm font-medium">
                      Last Name
                    </label>
                    <Input id="lastName" placeholder="Enter your last name" required />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email Address
                  </label>
                  <Input id="email" type="email" placeholder="Enter your email address" required />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">
                    Phone Number
                  </label>
                  <Input id="phone" type="tel" placeholder="Enter your phone number" required />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="linkedin" className="text-sm font-medium">
                    LinkedIn Profile
                  </label>
                  <Input id="linkedin" type="url" placeholder="Enter your LinkedIn profile URL" required />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="coverletter" className="text-sm font-medium">
                    Cover Letter
                  </label>
                  <Textarea
                    id="coverletter"
                    placeholder="Tell us why you're a good fit for this position"
                    rows={5}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="resume" className="text-sm font-medium">
                    Resume/CV
                  </label>
                  <Input id="resume" type="file" required className="cursor-pointer" />
                  <p className="text-xs text-muted-foreground mt-1">
                    Accepted formats: PDF, DOC, DOCX (Max size: 5MB)
                  </p>
                </div>
                
                <Button type="submit" className="w-full md:w-auto">
                  Submit Application
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
