
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Check, ArrowRight, MessagesSquare, FileText, Volume2, Globe, Zap, Shield, Users } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const { toast } = useToast();
  
  const handlePlanSelection = (plan: string) => {
    toast({
      title: `${plan} plan selected`,
      description: "Redirecting to checkout...",
    });
  };
  
  const plans = {
    monthly: [
      {
        name: "Free",
        description: "For individuals exploring AI capabilities",
        price: "$0",
        featured: false,
        features: [
          "1,000 AI chat messages",
          "25 content generations",
          "10 minutes of voice synthesis",
          "Basic support",
        ],
        limitations: ["Limited model selection", "No API access"],
        ctaText: "Get Started",
      },
      {
        name: "Standard",
        description: "For professionals and content creators",
        price: "$19",
        featured: true,
        features: [
          "10,000 AI chat messages",
          "250 content generations",
          "60 minutes of voice synthesis",
          "Priority support",
          "Advanced model selection",
          "API access (limited)",
        ],
        limitations: [],
        ctaText: "Choose Standard",
      },
      {
        name: "Pro",
        description: "For teams and businesses",
        price: "$49",
        featured: false,
        features: [
          "Unlimited AI chat messages",
          "1,000 content generations",
          "240 minutes of voice synthesis",
          "24/7 priority support",
          "All models access",
          "Full API access",
          "Team collaboration",
          "Custom voice training",
        ],
        limitations: [],
        ctaText: "Choose Pro",
      },
    ],
    yearly: [
      {
        name: "Free",
        description: "For individuals exploring AI capabilities",
        price: "$0",
        featured: false,
        features: [
          "1,000 AI chat messages",
          "25 content generations",
          "10 minutes of voice synthesis",
          "Basic support",
        ],
        limitations: ["Limited model selection", "No API access"],
        ctaText: "Get Started",
      },
      {
        name: "Standard",
        description: "For professionals and content creators",
        price: "$15",
        period: "$180 billed annually",
        saveAmount: "Save $48",
        featured: true,
        features: [
          "10,000 AI chat messages",
          "250 content generations",
          "60 minutes of voice synthesis",
          "Priority support",
          "Advanced model selection",
          "API access (limited)",
        ],
        limitations: [],
        ctaText: "Choose Standard",
      },
      {
        name: "Pro",
        description: "For teams and businesses",
        price: "$39",
        period: "$468 billed annually",
        saveAmount: "Save $120",
        featured: false,
        features: [
          "Unlimited AI chat messages",
          "1,000 content generations",
          "240 minutes of voice synthesis",
          "24/7 priority support",
          "All models access",
          "Full API access",
          "Team collaboration",
          "Custom voice training",
        ],
        limitations: [],
        ctaText: "Choose Pro",
      },
    ],
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <section className="py-12 md:py-24">
          <div className="container px-4 mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Choose the perfect plan for your AI needs. All plans include access to our core AI features.
            </p>
            
            <div className="flex items-center justify-center mb-10 space-x-4">
              <span 
                className={`text-sm ${billingCycle === 'monthly' ? 'text-foreground' : 'text-muted-foreground'}`}
              >
                Monthly
              </span>
              <Switch 
                checked={billingCycle === "yearly"} 
                onCheckedChange={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")} 
              />
              <div className="flex items-center">
                <span 
                  className={`text-sm ${billingCycle === 'yearly' ? 'text-foreground' : 'text-muted-foreground'}`}
                >
                  Annual
                </span>
                {billingCycle === "yearly" && (
                  <Badge className="ml-2 bg-green-100 text-green-800 hover:bg-green-200">Save 20%</Badge>
                )}
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {plans[billingCycle].map((plan, index) => (
                <Card 
                  key={index} 
                  className={`relative ${
                    plan.featured ? "shadow-lg border-primary/50" : ""
                  }`}
                >
                  {plan.featured && (
                    <div className="absolute -top-4 left-0 right-0 flex justify-center">
                      <Badge className="bg-primary text-primary-foreground hover:bg-primary/90">
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="text-4xl font-bold">
                        {plan.price}
                        <span className="text-base font-normal text-muted-foreground ml-1">
                          /month
                        </span>
                      </div>
                      {plan.period && (
                        <div className="text-sm text-muted-foreground">
                          {plan.period}
                        </div>
                      )}
                      {plan.saveAmount && (
                        <div className="text-sm font-medium text-green-600 dark:text-green-400">
                          {plan.saveAmount}
                        </div>
                      )}
                    </div>
                    
                    <div className="pt-4 space-y-2">
                      {plan.features.map((feature, i) => (
                        <div key={i} className="flex items-start">
                          <Check className="h-4 w-4 mr-2 mt-1 text-green-500" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                      {plan.limitations?.map((limitation, i) => (
                        <div key={i} className="flex items-start opacity-60">
                          <Check className="h-4 w-4 mr-2 mt-1 text-muted-foreground" />
                          <span className="text-sm">{limitation}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      onClick={() => handlePlanSelection(plan.name)} 
                      className={`w-full ${
                        plan.featured ? "bg-primary hover:bg-primary/90" : ""
                      }`}
                    >
                      {plan.ctaText}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        <section className="py-12 bg-muted/30">
          <div className="container px-4 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Compare Plans</h2>
              <p className="text-muted-foreground">
                Find the plan that's right for you and your workflow
              </p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-border">
                <thead>
                  <tr className="text-left">
                    <th className="py-3 px-6">Features</th>
                    <th className="py-3 px-6">Free</th>
                    <th className="py-3 px-6">Standard</th>
                    <th className="py-3 px-6">Pro</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr>
                    <td className="py-4 px-6 flex items-center">
                      <MessagesSquare className="h-4 w-4 mr-2" /> AI Chat
                    </td>
                    <td className="py-4 px-6">1,000 messages</td>
                    <td className="py-4 px-6">10,000 messages</td>
                    <td className="py-4 px-6">Unlimited</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 flex items-center">
                      <FileText className="h-4 w-4 mr-2" /> Content Generation
                    </td>
                    <td className="py-4 px-6">25 generations</td>
                    <td className="py-4 px-6">250 generations</td>
                    <td className="py-4 px-6">1,000 generations</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 flex items-center">
                      <Volume2 className="h-4 w-4 mr-2" /> Voice Synthesis
                    </td>
                    <td className="py-4 px-6">10 minutes</td>
                    <td className="py-4 px-6">60 minutes</td>
                    <td className="py-4 px-6">240 minutes</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 flex items-center">
                      <Globe className="h-4 w-4 mr-2" /> API Access
                    </td>
                    <td className="py-4 px-6">—</td>
                    <td className="py-4 px-6">Limited</td>
                    <td className="py-4 px-6">Full access</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 flex items-center">
                      <Zap className="h-4 w-4 mr-2" /> Advanced Models
                    </td>
                    <td className="py-4 px-6">—</td>
                    <td className="py-4 px-6">Basic access</td>
                    <td className="py-4 px-6">Full access</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 flex items-center">
                      <Shield className="h-4 w-4 mr-2" /> Priority Support
                    </td>
                    <td className="py-4 px-6">—</td>
                    <td className="py-4 px-6">✓</td>
                    <td className="py-4 px-6">24/7 Support</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 flex items-center">
                      <Users className="h-4 w-4 mr-2" /> Team Seats
                    </td>
                    <td className="py-4 px-6">1 user</td>
                    <td className="py-4 px-6">Up to 3 users</td>
                    <td className="py-4 px-6">Up to 10 users</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
        
        <section className="py-12 md:py-24">
          <div className="container px-4 mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-muted-foreground mb-12">
                Have questions? We're here to help.
              </p>
              
              <div className="space-y-6 text-left">
                {[
                  {
                    question: "Can I change plans later?",
                    answer: "Yes, you can upgrade or downgrade your plan at any time. If you upgrade, the new features will be available immediately. If you downgrade, the changes will take effect at the start of your next billing cycle."
                  },
                  {
                    question: "How do the usage limits work?",
                    answer: "Usage limits are based on your billing cycle. For example, if you're on the Standard plan, you get 10,000 AI chat messages per month. Any unused messages don't roll over to the next month."
                  },
                  {
                    question: "Do you offer a free trial?",
                    answer: "Yes, our Free plan acts as a perpetual free tier with limited features. For paid plans, we offer a 7-day money-back guarantee if you're not satisfied with our service."
                  },
                  {
                    question: "What payment methods do you accept?",
                    answer: "We accept all major credit cards, PayPal, and selected cryptocurrencies. All payments are processed securely through our payment providers."
                  },
                  {
                    question: "Can I request a refund?",
                    answer: "Yes, we offer a 7-day money-back guarantee for all new subscriptions. If you're not satisfied with our service, contact our support team within 7 days of your purchase for a full refund."
                  }
                ].map((faq, index) => (
                  <div key={index}>
                    <h3 className="text-lg font-medium mb-2">{faq.question}</h3>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-12 pt-8 border-t border-border">
                <h3 className="text-lg font-medium mb-4">Still have questions?</h3>
                <Button asChild>
                  <Link to="/contact" className="flex items-center">
                    Contact our Support Team <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
