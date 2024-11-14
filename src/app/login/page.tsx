"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authAPI } from '@/api/authAPI';
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from '@/hooks/use-toast';
import {
  Card,
  CardContent,
//   CardDescription,
//   CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { withAuthRedirect } from '@/components/withAuthRedirect';
import { CardSkeleton } from '@/components/card-skeleton';
import { DashboardSkeleton } from '@/components/dashboard-skeleton';
import OpenNavigation from '@/components/open-navigation';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const loginSchema = z.object({
    username: z.string()
        .min(1, "Username is required")
        .refine(value => !/\s/.test(value), "Username should not contain spaces"),
    password: z.string()
        .min(8, "Password must be at least 8 characters long")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter"),
});

function Login() {
    const { toast } = useToast();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            const response = await authAPI.login({ 
                grant_type: 'password',
                username: data.username,
                password: data.password 
            });
            if (response.status === 200) {
                const responseData = response.data;
                localStorage.setItem('token', responseData.access_token);
                localStorage.setItem('user_id', responseData.sub);
                localStorage.setItem('email', responseData.email);
                localStorage.setItem('username', responseData.username);
                toast({
                    title: "Success",
                    description: "You have successfully logged in.",
                    variant: "success",
                });
                router.push('/dashboard');
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Login failed. Please check your credentials.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
        { loading ? <DashboardSkeleton /> :
        <div className="flex flex-col min-h-screen">
            <OpenNavigation />
            <main className="flex-grow flex justify-center items-center">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle>Login</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="container mx-auto p-4">
                        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                            <div>
                            <Label htmlFor="username">Email or Username</Label>
                            <Input 
                                type="text" 
                                id="username" 
                                placeholder="Enter your email or username" 
                                {...register('username')}
                                className={errors.username ? 'border-red-500' : ''}
                            />
                            {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
                            </div>
                            <div>
                            <Label htmlFor="password">Password</Label>
                            <Input 
                                type="password" 
                                id="password" 
                                placeholder="Enter your password" 
                                {...register('password')}
                                className={errors.password ? 'border-red-500' : ''}
                            />
                            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                            </div>
                            <Button type="submit">Login</Button>
                        </form>
                        <p className="mt-4">
                            Don't have an account? <Link href="/signup" className="text-blue-500">Sign up</Link>
                        </p>
                        </div>
                    </CardContent>
                </Card>
            </main>
        </div>}</>
    );
}

export default withAuthRedirect(Login, CardSkeleton, '/dashboard');