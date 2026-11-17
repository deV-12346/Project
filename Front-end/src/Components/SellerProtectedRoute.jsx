import { Navigate, useLocation } from 'react-router-dom';
import { UseAppContext } from '../Context/AppContext';

/**
 * SellerProtectedRoute Component
 * Protects seller-specific routes
 * Redirects to seller login page if not authenticated
 * Also checks if the user has seller role
 */
const SellerProtectedRoute = ({ children }) => {
  const { user } = UseAppContext();
  const location = useLocation();
  
  // Check if user is authenticated
  const token = localStorage.getItem('token');
  
  if (!user || !token) {
    // Save the current location to redirect back after login
    return <Navigate to="/sellerlogin" state={{ from: location }} replace />;
  }

  // Optional: Check if user has seller role
  // Uncomment if you have role-based authentication
  // if (user.role !== 'seller') {
  //   return <Navigate to="/" replace />;
  // }

  return children;
};

export default SellerProtectedRoute;
