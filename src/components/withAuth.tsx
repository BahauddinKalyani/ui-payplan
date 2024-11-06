"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export function withAuth(WrappedComponent, Skeleton, redirectUrl = '/login') {
  return function AuthenticatedComponent(props) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
      async function checkAuth() {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push(redirectUrl);
        } else {
            setIsAuthenticated(true);
        }
        setIsLoading(false);
      }
      checkAuth();
    }, [router]);

    if (isLoading) {
      return (
        <Skeleton />
      );
    }

    return isAuthenticated ? <WrappedComponent {...props} /> : null;
  };
}