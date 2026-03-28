import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  if (!user || !user.token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}