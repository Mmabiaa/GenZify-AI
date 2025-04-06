
export interface Career {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
}

export const careers: Career[] = [
  {
    id: 1,
    title: "AI Research Scientist",
    department: "Research & Development",
    location: "San Francisco, CA",
    type: "Full-time",
    description: "We're looking for an AI Research Scientist to join our growing team. In this role, you'll work on cutting-edge AI technologies focused on natural language processing and content generation that specifically caters to Generation Z users.",
    requirements: [
      "Ph.D. or Master's degree in Computer Science, Machine Learning, or related field",
      "3+ years of experience in AI research, preferably in NLP or generative models",
      "Strong publication record or demonstrable practical implementations",
      "Experience with PyTorch, TensorFlow, or similar frameworks",
      "Strong programming skills in Python and familiarity with deep learning architectures"
    ],
    responsibilities: [
      "Develop novel AI algorithms and models for next-generation language understanding",
      "Improve our content generation capabilities with focus on Gen Z communication patterns",
      "Collaborate with product teams to implement research findings into production",
      "Stay updated with latest research and integrate promising approaches",
      "Publish research findings in academic conferences and journals"
    ]
  },
  {
    id: 2,
    title: "Frontend Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    description: "We're seeking a talented Frontend Engineer to create engaging, intuitive user experiences for our AI platform. You'll work with our design and product teams to build beautiful interfaces that make complex AI capabilities accessible to Generation Z users.",
    requirements: [
      "3+ years of experience with React and modern JavaScript",
      "Strong understanding of TypeScript, CSS, and responsive design",
      "Experience with UI component libraries and state management",
      "Knowledge of web accessibility standards",
      "Portfolio demonstrating UX-focused development work"
    ],
    responsibilities: [
      "Build responsive, performant user interfaces using React and TypeScript",
      "Implement designs with pixel-perfect attention to detail",
      "Develop reusable components and maintain our design system",
      "Work closely with designers to translate wireframes into functional interfaces",
      "Optimize application performance and ensure cross-browser compatibility"
    ]
  },
  {
    id: 3,
    title: "Product Marketing Manager",
    department: "Marketing",
    location: "New York, NY",
    type: "Full-time",
    description: "As a Product Marketing Manager at GenZify, you'll be responsible for developing and executing marketing strategies that resonate with Generation Z. You'll work closely with product and sales teams to position our AI tools effectively in the market.",
    requirements: [
      "4+ years of experience in product marketing, preferably in SaaS or tech",
      "Proven track record of successful product launches and campaigns",
      "Strong understanding of digital marketing channels and metrics",
      "Excellent communication and storytelling skills",
      "Experience marketing to younger demographics (Gen Z, Millennials)"
    ],
    responsibilities: [
      "Develop product positioning, messaging, and go-to-market strategies",
      "Create compelling content for various marketing channels",
      "Conduct competitive analysis and market research",
      "Collaborate with sales to create enablement materials",
      "Track and analyze campaign performance to optimize results"
    ]
  },
  {
    id: 4,
    title: "Customer Success Manager",
    department: "Customer Experience",
    location: "Remote",
    type: "Full-time",
    description: "We're looking for a Customer Success Manager to help our customers achieve their goals using our AI platform. You'll be the primary point of contact for key accounts, ensuring they get maximum value from our tools and become long-term advocates.",
    requirements: [
      "3+ years of customer success experience, preferably in SaaS",
      "Strong communication and relationship-building skills",
      "Experience with customer success platforms and methodologies",
      "Problem-solving mindset and ability to navigate technical discussions",
      "Data-driven approach to measuring customer satisfaction and retention"
    ],
    responsibilities: [
      "Own the customer relationship post-sale, ensuring high satisfaction and retention",
      "Develop and execute customer onboarding and training programs",
      "Identify upsell and cross-sell opportunities within accounts",
      "Gather customer feedback to inform product improvements",
      "Serve as the voice of the customer within the organization"
    ]
  }
];
