import { Navigate } from 'react-router-dom';
import type { User } from '../types';

interface ProtectedRouteProps {
  children: React.JSX.Element;
  requiredRole?: string;
}

export default function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const savedUser = localStorage.getItem('user');
  const user: User | null = savedUser ? JSON.parse(savedUser) : null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    console.warn(`Access denied. User role: ${user.role}, Required: ${requiredRole}`);
    return <Navigate to="/" replace />;
  }

  return children;
}