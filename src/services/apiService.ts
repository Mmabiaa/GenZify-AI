
import appConfig from "../config/appConfig";

/**
 * Generic API service for making HTTP requests
 */
export const apiService = {
  /**
   * Get API key from storage or environment
   */
  getApiKey: () => {
    return import.meta.env.VITE_OPENAI_API_KEY || localStorage.getItem(appConfig.storageKeys.apiKey);
  },

  /**
   * Generic fetch function with timeout and error handling
   */
  fetchWithTimeout: async (url: string, options = {}, timeout = appConfig.apiTimeoutMs) => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    
    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });
      
      clearTimeout(id);
      return response;
    } catch (error) {
      clearTimeout(id);
      throw error;
    }
  },

  /**
   * Handle API errors consistently
   */
  handleApiError: (error: any) => {
    if (error.name === "AbortError") {
      return { error: "Request timed out. Please try again." };
    }
    
    console.error("API Error:", error);
    return { error: error.message || appConfig.fallbackMessage };
  }
};

export default apiService;
