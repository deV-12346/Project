import { Navigate } from 'react-router-dom';
import { UseAppContext } from '../Context/AppContext';

/**
 * PublicRoute Component
 * Prevents authenticated users from accessing login/signup pages
 * Redirects authenticated users to home page
 */
const PublicRoute = ({ children }) => {
  const { user } = UseAppContext();
  const token = localStorage.getItem('token');
  
  // If user is already logged in, redirect to home
  if (user && token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicRoute;
