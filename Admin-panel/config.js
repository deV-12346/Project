/**
 * Application Configuration
 * Environment-based configuration management
 * 
 * Environment Variables:
 * - VITE_API_BASE_URL: Backend API URL (required)
 * - VITE_API_TIMEOUT: API request timeout in milliseconds (optional, default: 5000)
 * - VITE_APP_ENV: Current environment (development, production, staging)
 */

// Validate required environment variables
const requiredEnvVars = ['VITE_API_BASE_URL'];
const missingEnvVars = requiredEnvVars.filter(envVar => !import.meta.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error(
    `❌ Missing required environment variables: ${missingEnvVars.join(', ')}\n` +
    `Please check your .env.${import.meta.env.MODE} file or create one from .env.example`
  );
  throw new Error(`Missing environment variables: ${missingEnvVars.join(', ')}`);
}

// Export configuration
export const baseURL = import.meta.env.VITE_API_BASE_URL;
export const apiTimeout = parseInt(import.meta.env.VITE_API_TIMEOUT) || 5000;
export const appEnv = import.meta.env.VITE_APP_ENV || import.meta.env.MODE;

// Development mode logging
if (import.meta.env.DEV) {
  console.log('🔧 Running in:', appEnv);
  console.log('🌐 API Base URL:', baseURL);
  console.log('⏱️ API Timeout:', apiTimeout + 'ms');
}

// Prevent accidental production usage with localhost
if (import.meta.env.PROD && baseURL.includes('localhost')) {
  console.warn(
    '⚠️ WARNING: Production build is configured to use localhost!\n' +
    'This will not work in deployed environment. Please update VITE_API_BASE_URL in .env.production'
  );
}