
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ThemeToggle from "./ThemeToggle";
import { Menu, X, ChevronDown } from "lucide-react";

const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link
    to={to}
    className="text-foreground/70 hover:text-foreground transition-colors px-4 py-2 rounded-md hover:bg-foreground/10"
  >
    {children}
  </Link>
);

const MobileNavLink = ({
  to,
  children,
  onClick,
}: {
  to: string;
  children: React.ReactNode;
  onClick: () => void;
}) => (
  <Link
    to={to}
    className="w-full text-left px-4 py-3 hover:bg-foreground/10 rounded-md"
    onClick={onClick}
  >
    {children}
  </Link>
);

const DropdownMenu = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center text-foreground/70 hover:text-foreground transition-colors px-4 py-2 rounded-md hover:bg-foreground/10"
      >
        {title}
        <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-48 rounded-md bg-background border border-border shadow-lg z-50">
          <div className="py-1 flex flex-col">{children}</div>
        </div>
      )}
    </div>
  );
};

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };
  
  return (
    <nav className="sticky top-0 z-40 w-full backdrop-blur-md bg-background/80 border-b border-border">
      <div className="container flex items-center justify-between h-16 mx-auto px-4">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">
              GenZify
            </span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <NavLink to="/">Home</NavLink>
          
          <DropdownMenu title="AI Tools">
            <Link to="/chat" className="px-4 py-2 hover:bg-foreground/10">AI Chat</Link>
            <Link to="/content-generator" className="px-4 py-2 hover:bg-foreground/10">Content Generator</Link>
            <Link to="/voice" className="px-4 py-2 hover:bg-foreground/10">Voice AI</Link>
          </DropdownMenu>
          
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/about">About</NavLink>
          
          <div className="flex items-center gap-4 pl-4 border-l border-border">
            <ThemeToggle />
            <Button asChild variant="default" className="bg-primary hover:bg-primary/90">
              <Link to="/login">Sign In</Link>
            </Button>
          </div>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={toggleMobileMenu} aria-label="Menu">
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-16 bg-background z-30 md:hidden animate-fade-in">
          <div className="flex flex-col p-4 space-y-2">
            <MobileNavLink to="/" onClick={closeMobileMenu}>
              Home
            </MobileNavLink>
            <div className="border-t border-border my-2"></div>
            <div className="font-medium text-sm text-foreground/50 px-4 py-1">
              AI TOOLS
            </div>
            <MobileNavLink to="/chat" onClick={closeMobileMenu}>
              AI Chat
            </MobileNavLink>
            <MobileNavLink to="/content-generator" onClick={closeMobileMenu}>
              Content Generator
            </MobileNavLink>
            <MobileNavLink to="/voice" onClick={closeMobileMenu}>
              Voice AI
            </MobileNavLink>
            <div className="border-t border-border my-2"></div>
            <MobileNavLink to="/dashboard" onClick={closeMobileMenu}>
              Dashboard
            </MobileNavLink>
            <MobileNavLink to="/about" onClick={closeMobileMenu}>
              About
            </MobileNavLink>
            <div className="border-t border-border my-2"></div>
            <div className="px-4 py-2">
              <Button asChild className="w-full bg-primary hover:bg-primary/90">
                <Link to="/login">Sign In</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
