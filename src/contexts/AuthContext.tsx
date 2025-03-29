
import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithGithub: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check local storage for user data on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // In a real app, this would call an API endpoint to validate credentials
      // For demo purposes, we'll create a mock user
      const mockUser: User = {
        id: "user123",
        name: email.split('@')[0],
        email: email,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      };
      
      // Store user data in local storage
      localStorage.setItem("user", JSON.stringify(mockUser));
      setUser(mockUser);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      // In a real app, this would call an API endpoint to create a user
      // For demo purposes, we'll create a mock user
      const mockUser: User = {
        id: "user" + Math.floor(Math.random() * 10000),
        name: name,
        email: email,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      };
      
      // Store user data in local storage
      localStorage.setItem("user", JSON.stringify(mockUser));
      setUser(mockUser);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      // In a real app, this would redirect to Google OAuth
      // For demo purposes, we'll create a mock user
      const mockUser: User = {
        id: "googleuser" + Math.floor(Math.random() * 10000),
        name: "Google User",
        email: "google.user@example.com",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=google",
      };
      
      // Store user data in local storage
      localStorage.setItem("user", JSON.stringify(mockUser));
      setUser(mockUser);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGithub = async () => {
    setIsLoading(true);
    try {
      // In a real app, this would redirect to GitHub OAuth
      // For demo purposes, we'll create a mock user
      const mockUser: User = {
        id: "githubuser" + Math.floor(Math.random() * 10000),
        name: "GitHub User",
        email: "github.user@example.com",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=github",
      };
      
      // Store user data in local storage
      localStorage.setItem("user", JSON.stringify(mockUser));
      setUser(mockUser);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    // Remove user data from local storage
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signUp,
        loginWithGoogle,
        loginWithGithub,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
