import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/stores/useAuth';
import Loader from './Loader';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isLoggedIn, loading, verifyLogin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    verifyLogin();
  }, [verifyLogin]);

  useEffect(() => {
    if (!isLoggedIn && !loading) {
      router.push('/login');
    }
  }, [isLoggedIn, loading, router]);

  if (loading) {
    return <Loader customMessage="Verifying authentication..." />;
  }

  return isLoggedIn ? <>{children}</> : null;
};

export default ProtectedRoute;