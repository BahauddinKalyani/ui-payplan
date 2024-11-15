"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { ComponentType } from 'react';

export function withAuth<T>(WrappedComponent: ComponentType<T>, Skeleton: ComponentType, redirectUrl = '/login') {
  return function AuthenticatedComponent(props: T) {
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

    return isAuthenticated ? <WrappedComponent {...(props as T & JSX.IntrinsicAttributes)} /> : null;
  };
}