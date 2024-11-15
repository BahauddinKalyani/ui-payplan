import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
// import { Skeleton } from "@/components/ui/skeleton";
import { ComponentType } from 'react';

export function withAuthRedirect<T>(WrappedComponent: ComponentType<T>, Skeleton: ComponentType, redirectUrl = '/') {
  return function AuthRedirectComponent(props: T) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isChecking, setIsChecking] = useState(true);
    const router = useRouter();

    useEffect(() => {
      const checkAuth = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            router.push(redirectUrl);
            setIsAuthenticated(true);
        }
        setIsChecking(false);
      };

      checkAuth();
    }, [router]);

    if (isChecking) {
      return (
        <Skeleton />
      );
    }

    return isAuthenticated ? null: <WrappedComponent {...(props as T & JSX.IntrinsicAttributes)} />;
  };
}