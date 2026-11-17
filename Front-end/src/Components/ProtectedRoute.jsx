import { Navigate, useLocation } from 'react-router-dom';
import { UseAppContext } from '../Context/AppContext';

/**
 * ProtectedRoute Component
 * Protects routes that require authentication
 * Redirects to login page if user is not authenticated
 * Preserves the intended destination for redirect after login
 */
const ProtectedRoute = ({ children }) => {
  const { user } = UseAppContext();
  const location = useLocation();
  
  // Check if user is authenticated
  const token = localStorage.getItem('token');
  
  if (!user || !token) {
    // Save the current location to redirect back after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
