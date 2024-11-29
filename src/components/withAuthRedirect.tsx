import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
// import { Skeleton } from "@/components/ui/skeleton";
import { ComponentType } from 'react';
import { authAPI } from '@/api/authAPI';

export function withAuthRedirect<T>(WrappedComponent: ComponentType<T>, Skeleton: ComponentType, redirectUrl = '/') {
  return function AuthRedirectComponent(props: T) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isChecking, setIsChecking] = useState(true);
    const router = useRouter();

    useEffect(() => {
      const checkwithAuth = async () => {
        const response = await authAPI.checkAuth();
        if (response) {
          router.push(redirectUrl);
          setIsAuthenticated(true);
        }
        setIsChecking(false);
      };

      checkwithAuth();
    }, [router]);

    if (isChecking) {
      return (
        <Skeleton />
      );
    }

    return isAuthenticated ? null: <WrappedComponent {...(props as T & JSX.IntrinsicAttributes)} />;
  };
}