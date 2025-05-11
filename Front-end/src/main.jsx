import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from "./Context/AppContext";
import './index.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <AuthProvider>
    <GoogleOAuthProvider clientId='145391084796-lqr3nq62d2igu8tdbkaf1hmt1impp0hr.apps.googleusercontent.com'>
    <App />
    </GoogleOAuthProvider>
  </AuthProvider>
  </StrictMode>,
)
