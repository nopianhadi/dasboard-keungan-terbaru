// App configuration
export const APP_CONFIG = {
  // Set to false to disable MSW completely for better performance
  ENABLE_MSW: false,
  
  // API configuration
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || '/api',
  
  // Performance settings
  ENABLE_MOCK_DELAYS: false,
  DEFAULT_MOCK_DELAY: 0,
} as const;