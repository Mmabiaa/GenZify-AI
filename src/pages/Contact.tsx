
import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function Contact() {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description: "We've received your message and will get back to you shortly.",
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
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent mb-4">
              Get in Touch
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have questions about GenZify AI? Our team is here to help you with anything you need.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Send us a message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you as soon as possible.
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
                      <label htmlFor="subject" className="text-sm font-medium">
                        Subject
                      </label>
                      <Input id="subject" placeholder="What is this regarding?" required />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        placeholder="How can we help you?"
                        rows={5}
                        required
                      />
                    </div>
                    
                    <Button type="submit" className="w-full md:w-auto">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>
                    Reach out to us through any of these channels
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-medium">Our Location</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        1234 Innovation Street<br />
                        Tech District<br />
                        San Francisco, CA 94107
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Phone className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-medium">Phone Number</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        +1 (555) 123-4567
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Mail className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-medium">Email Address</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        hello@genzify.ai<br />
                        support@genzify.ai
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Clock className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-medium">Business Hours</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Monday - Friday: 9am - 6pm PST<br />
                        Saturday: 10am - 4pm PST<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
