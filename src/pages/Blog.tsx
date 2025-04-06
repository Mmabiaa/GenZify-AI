
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  readTime: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Future of Gen Z and AI: What's Next?",
    excerpt: "Exploring how Generation Z is shaping and being shaped by artificial intelligence technologies.",
    date: "April 2, 2025",
    author: "Alex Johnson",
    category: "AI Trends",
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "Creating Viral Content with GenZify AI",
    excerpt: "Learn how content creators are leveraging our AI tools to create engaging, shareable content.",
    date: "March 28, 2025",
    author: "Mia Rodriguez",
    category: "Content Creation",
    readTime: "7 min read"
  },
  {
    id: 3,
    title: "Voice AI: The Technology Revolutionizing Communication",
    excerpt: "How voice synthesis technology is changing the way we interact with digital platforms.",
    date: "March 22, 2025",
    author: "Tyler Chang",
    category: "Voice Technology",
    readTime: "6 min read"
  },
  {
    id: 4,
    title: "AI Ethics: Responsible Innovation for Gen Z",
    excerpt: "Discussing the importance of ethical considerations in AI development for younger generations.",
    date: "March 15, 2025",
    author: "Jordan Smith",
    category: "AI Ethics",
    readTime: "8 min read"
  },
  {
    id: 5,
    title: "The GenZify Journey: From Startup to AI Platform",
    excerpt: "Our founder shares the story of how GenZify evolved from a simple idea to a comprehensive AI platform.",
    date: "March 10, 2025",
    author: "Sam Taylor",
    category: "Company News",
    readTime: "10 min read"
  },
  {
    id: 6,
    title: "AI and Education: Tools for Next-Gen Learning",
    excerpt: "How artificial intelligence is transforming educational experiences for Generation Z students.",
    date: "March 5, 2025",
    author: "Jamie Wong",
    category: "Education",
    readTime: "6 min read"
  }
];

export default function Blog() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent mb-4">
              GenZify Blog
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Insights, tutorials, and updates from the cutting edge of AI for Generation Z creators and innovators.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-medium px-2.5 py-0.5 rounded bg-primary/10 text-primary">
                      {post.category}
                    </span>
                    <span className="text-xs text-muted-foreground">{post.readTime}</span>
                  </div>
                  <CardTitle className="text-xl line-clamp-2">{post.title}</CardTitle>
                </CardHeader>
                <CardContent className="pb-4">
                  <CardDescription className="line-clamp-3">
                    {post.excerpt}
                  </CardDescription>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                  <div className="text-sm">
                    <span className="text-foreground font-medium">{post.author}</span>
                    <span className="text-muted-foreground"> • {post.date}</span>
                  </div>
                  <Button variant="ghost" size="sm">
                    Read more
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Button className="bg-primary hover:bg-primary/90">
              Load More Articles
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
