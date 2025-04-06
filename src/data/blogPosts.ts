
export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  readTime: string;
  image: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Future of Gen Z and AI: What's Next?",
    excerpt: "Exploring how Generation Z is shaping and being shaped by artificial intelligence technologies.",
    date: "April 2, 2025",
    author: "Alex Johnson",
    category: "AI Trends",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    title: "Creating Viral Content with GenZify AI",
    excerpt: "Learn how content creators are leveraging our AI tools to create engaging, shareable content.",
    date: "March 28, 2025",
    author: "Mia Rodriguez",
    category: "Content Creation",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&q=80"
  },
  {
    id: 3,
    title: "Voice AI: The Technology Revolutionizing Communication",
    excerpt: "How voice synthesis technology is changing the way we interact with digital platforms.",
    date: "March 22, 2025",
    author: "Tyler Chang",
    category: "Voice Technology",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80"
  },
  {
    id: 4,
    title: "AI Ethics: Responsible Innovation for Gen Z",
    excerpt: "Discussing the importance of ethical considerations in AI development for younger generations.",
    date: "March 15, 2025",
    author: "Jordan Smith",
    category: "AI Ethics",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80"
  },
  {
    id: 5,
    title: "The GenZify Journey: From Startup to AI Platform",
    excerpt: "Our founder shares the story of how GenZify evolved from a simple idea to a comprehensive AI platform.",
    date: "March 10, 2025",
    author: "Sam Taylor",
    category: "Company News",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80"
  },
  {
    id: 6,
    title: "AI and Education: Tools for Next-Gen Learning",
    excerpt: "How artificial intelligence is transforming educational experiences for Generation Z students.",
    date: "March 5, 2025",
    author: "Jamie Wong",
    category: "Education",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&q=80"
  }
];
