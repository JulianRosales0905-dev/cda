import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { UserRole } from '../../lib/types';

type RequireAuthProps = {
  children: React.ReactNode;
  allowedRoles: UserRole[];
};

const RequireAuth: React.FC<RequireAuthProps> = ({ children, allowedRoles }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    // Redirect to home page if not authorized
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default RequireAuth;