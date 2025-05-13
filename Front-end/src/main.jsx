import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from "./Context/AppContext";
import './index.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <AuthProvider>
    <GoogleOAuthProvider clientId='453300677408-587jl1h91j1eo1tr1ivn8h4noc9k1msj.apps.googleusercontent.com'>
    <App />
    </GoogleOAuthProvider>
  </AuthProvider>
  </StrictMode>,
)
