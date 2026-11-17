import axios from "axios"
import { baseURL, apiTimeout } from './config'
import { toast } from 'react-toastify'

// Create axios instance with environment-based configuration
const instance = axios.create({
      baseURL: baseURL,
      timeout: apiTimeout,
      headers: {
            'Content-Type': 'application/json',
      }
})

// Flag to prevent multiple simultaneous logout operations
let isLoggingOut = false;

// Request interceptor - Add authentication token
instance.interceptors.request.use(
      async(config)=>{
            try {
                  const token = localStorage.getItem("token")
                  if(!token){
                        console.log("Token not found")
                  }
                  if(token){
                        config.headers.Authorization = `Bearer ${token}`
                  }
                  return config
            } catch (error) {
                  console.error("Request interceptor error:", error)
                  return Promise.reject(error)
            }
      },
      (error) => {
            console.error('Request error:', error)
            return Promise.reject(error)
      }
)

// Response interceptor - Handle responses and errors
instance.interceptors.response.use(
      (response)=>{
            // Only log in development mode
            if (import.meta.env.DEV) {
                  console.log("Response data:", response)
            }
            return response
      },
      (error)=>{
            console.error("Response error:", error)
            
            // Handle 401 Unauthorized - Automatic logout
            if (error?.response?.status === 401) {
                  // Prevent multiple simultaneous logout operations
                  if (!isLoggingOut) {
                        isLoggingOut = true;
                        
                        // Clear authentication data
                        localStorage.removeItem('token');
                        
                        // Show notification
                        toast.error('Session expired. Please login again.');
                        
                        // Redirect to login page
                        window.location.href = '/';
                        
                        // Reset flag after a short delay
                        setTimeout(() => {
                              isLoggingOut = false;
                        }, 1000);
                  }
                  
                  return Promise.reject(new Error('Session expired'));
            }
            
            if(error?.response){
                  const errorMessage = error?.response?.data?.message || 'An error occurred';
                  console.error('API Error:', errorMessage)
                  return Promise.reject(new Error(errorMessage));  
            }
            
            // Network error or timeout
            if (error.code === 'ECONNABORTED') {
                  return Promise.reject(new Error('Request timeout. Please try again.'));
            }
            
            if (!error.response) {
                  return Promise.reject(new Error('Network error. Please check your connection.'));
            }
            
            return Promise.reject(error)
      }
)

export default instance