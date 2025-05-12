
import { toast } from "@/hooks/use-toast";
import appConfig from "../config/appConfig";

/**
 * Custom error class for application errors
 */
export class AppError extends Error {
  public code: string;
  
  constructor(message: string, code: string = "APP_ERROR") {
    super(message);
    this.name = "AppError";
    this.code = code;
  }
}

/**
 * Centralized error handling
 */
export const errorHandler = {
  /**
   * Handle errors throughout the application
   */
  handle: (error: any, context?: string) => {
    const errorContext = context ? `[${context}] ` : "";
    const errorMessage = error?.message || appConfig.fallbackMessage;
    
    // Log error with context
    console.error(`${errorContext}Error:`, error);
    
    // For dev environment, show more details
    if (appConfig.isDev) {
      toast({
        title: "Error",
        description: `${errorMessage} ${error.stack ? "(See console for details)" : ""}`,
        variant: "destructive",
      });
    } else {
      // For production, show user-friendly message
      toast({
        title: "Something went wrong",
        description: errorMessage,
        variant: "destructive",
      });
    }
    
    // In production, we could also send errors to a monitoring service
    if (appConfig.isProd) {
      // Implement error reporting service integration here
    }
    
    return errorMessage;
  },
  
  /**
   * Try an operation and handle any errors
   */
  tryOperation: async (operation: Function, context?: string) => {
    try {
      return await operation();
    } catch (error) {
      errorHandler.handle(error, context);
      throw error;
    }
  }
};

export default errorHandler;
