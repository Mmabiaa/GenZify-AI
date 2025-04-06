
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { blogPosts } from "@/data/blogPosts";

export default function Blog() {
  const [visiblePosts, setVisiblePosts] = React.useState(6);
  
  const loadMorePosts = () => {
    setVisiblePosts(prevCount => Math.min(prevCount + 3, blogPosts.length));
  };
  
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
            {blogPosts.slice(0, visiblePosts).map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <Link to={`/blog/${post.id}`} className="block">
                  <div className="w-full h-48 overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                </Link>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-medium px-2.5 py-0.5 rounded bg-primary/10 text-primary">
                      {post.category}
                    </span>
                    <span className="text-xs text-muted-foreground">{post.readTime}</span>
                  </div>
                  <CardTitle className="text-xl line-clamp-2">
                    <Link to={`/blog/${post.id}`}>{post.title}</Link>
                  </CardTitle>
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
                  <Button variant="ghost" size="sm" asChild>
                    <Link to={`/blog/${post.id}`}>Read more</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            {visiblePosts < blogPosts.length ? (
              <Button className="bg-primary hover:bg-primary/90" onClick={loadMorePosts}>
                Load More Articles
              </Button>
            ) : (
              <p className="text-muted-foreground">You've reached the end of our articles.</p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
