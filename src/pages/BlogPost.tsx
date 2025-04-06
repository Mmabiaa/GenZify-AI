
import React from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Calendar, Clock, User, Tag } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";

export default function BlogPost() {
  const { id } = useParams();
  const postId = parseInt(id || "1");
  
  const post = blogPosts.find(post => post.id === postId) || blogPosts[0];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <Button asChild variant="ghost" size="sm" className="mb-4">
              <Link to="/blog" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Blog
              </Link>
            </Button>
            
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium px-2.5 py-0.5 rounded bg-primary/10 text-primary">
                {post.category}
              </span>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{post.readTime}</span>
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold">{post.title}</h1>
            
            <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
              <User className="h-4 w-4" />
              <span>{post.author}</span>
              <span>•</span>
              <Calendar className="h-4 w-4" />
              <span>{post.date}</span>
            </div>
          </div>
          
          <Card className="mb-8 overflow-hidden">
            <CardContent className="p-0">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-auto aspect-video object-cover"
              />
            </CardContent>
          </Card>
          
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p className="lead">{post.excerpt}</p>
            
            <p>
              The world of artificial intelligence is evolving rapidly, especially in how it relates to Generation Z. 
              As digital natives who have grown up in a world where technology is seamlessly integrated into daily life, 
              Gen Z has a unique relationship with AI that is both intuitive and complex.
            </p>
            
            <h2>How Gen Z is Shaping AI Development</h2>
            
            <p>
              Unlike previous generations, Gen Z approaches technology with an inherent understanding that comes from 
              lifelong exposure. This familiarity translates into higher expectations for AI tools and platforms. 
              They demand AI that is not only functional but also ethical, personalized, and aligned with their values.
            </p>
            
            <blockquote>
              "The next generation doesn't just want AI that works well—they expect AI that works with them, 
              understands their unique needs, and respects their individual expression."
            </blockquote>
            
            <p>
              This has led to a shift in AI development priorities. Companies are investing more in:
            </p>
            
            <ul>
              <li>Personalization capabilities that adapt to individual preferences</li>
              <li>Ethical AI frameworks that address bias and privacy concerns</li>
              <li>Creative tools that enhance rather than replace human creativity</li>
              <li>Social and collaborative features that facilitate community building</li>
            </ul>
            
            <h2>The Future Landscape</h2>
            
            <p>
              As Gen Z enters the workforce and gains more economic influence, their impact on AI will only grow. 
              We're already seeing this in the rising popularity of AI tools designed specifically for content creation, 
              social connection, and personal expression—all areas that resonate strongly with Gen Z values.
            </p>
            
            <p>
              The most successful AI platforms will be those that can balance powerful functionality with ethical 
              considerations, personal expression, and authentic community building. GenZify is committed to being 
              at the forefront of this movement, creating AI tools that don't just work for Gen Z, but work with them 
              to amplify their unique voices and perspectives.
            </p>
          </div>
          
          <div className="mt-12 flex items-center gap-2">
            <Tag className="h-5 w-5 text-muted-foreground" />
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm">AI Trends</Button>
              <Button variant="outline" size="sm">Generation Z</Button>
              <Button variant="outline" size="sm">Technology</Button>
              <Button variant="outline" size="sm">Future</Button>
            </div>
          </div>
          
          <div className="mt-12 border-t border-border pt-8">
            <h3 className="text-xl font-bold mb-6">Related Posts</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {blogPosts.filter(p => p.id !== postId).slice(0, 2).map(relatedPost => (
                <Card key={relatedPost.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <Link to={`/blog/${relatedPost.id}`} className="block">
                    <div className="w-full h-40 overflow-hidden">
                      <img 
                        src={relatedPost.image} 
                        alt={relatedPost.title} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <h4 className="text-lg font-bold mb-2 line-clamp-2">{relatedPost.title}</h4>
                      <p className="text-sm text-muted-foreground line-clamp-2">{relatedPost.excerpt}</p>
                    </div>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
