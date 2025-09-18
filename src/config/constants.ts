// API Keys - Replace with your actual API keys
export const API_KEYS = {
  // OpenAI API Key for chatbot and image analysis
  OPENAI_API_KEY: "your-openai-api-key-here",
  
  // WeatherAPI.com key for weather data
  WEATHER_API_KEY: "your-weatherapi-key-here",
  
  // Optional: Add other API keys as needed
  // MARKET_API_KEY: "your-market-api-key-here",
} as const;

// API Base URLs
export const API_URLS = {
  OPENAI: "https://api.openai.com/v1",
  WEATHER: "https://api.weatherapi.com/v1",
} as const;

// Application constants
export const APP_CONFIG = {
  DEFAULT_LOCATION: "Kochi, Kerala",
  CACHE_DURATION: 15 * 60 * 1000, // 15 minutes
  MAX_IMAGE_SIZE: 5 * 1024 * 1024, // 5MB
} as const;