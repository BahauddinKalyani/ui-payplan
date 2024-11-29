"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authAPI } from '@/api/authAPI';
import { ComponentType } from 'react';

export function withAuth<T>(WrappedComponent: ComponentType<T>, Skeleton: ComponentType, redirectUrl = '/login') {
  return function AuthenticatedComponent(props: T) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
      async function checkAuth() {
        try {
          const response = await authAPI.checkAuth();
          if (!response) {
            router.push(redirectUrl);
          } else {
              setIsAuthenticated(true);
          }
        } finally {
          setIsLoading(false);
        }
      }
      checkAuth();
    }, [router]);

    if (isLoading) {
      return (
        <Skeleton />
      );
    }

    return isAuthenticated ? <WrappedComponent {...(props as T & JSX.IntrinsicAttributes)} /> : null;
  };
}