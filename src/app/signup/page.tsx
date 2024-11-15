'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from 'next/navigation';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { withAuthRedirect } from '@/components/withAuthRedirect';
import { CardSkeleton } from '@/components/card-skeleton';
import { useToast } from '@/hooks/use-toast';
import { authAPI } from '@/api/authAPI';
import OpenNavigation from '@/components/open-navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const schema = z.object({
    username: z.string()
        .min(1, "Username is required")
        .refine(value => !/\s/.test(value), "Username should not contain spaces"),
    email: z.string()
        .email("Invalid email address"),
    password: z.string()
        .min(8, "Password must be at least 8 characters long")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter"),
});

function Signup() {
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    const router = useRouter();

    // Initialize React Hook Form with Zod validation
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<{ username: string; email: string; password: string }>({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data: { username: string; email: string; password: string }) => {
        try {
            setLoading(true);
            const response = await authAPI.signup(data);
            if (response.status === 200) {
                localStorage.setItem('username', data.username);
                toast({
                    title: "Success",
                    description: "You have successfully signed up.",
                    variant: "success",
                });
                router.push('/email-confirmation');
            }
            setLoading(false);
        } catch (error) {
            toast({
                title: "Error",
                description: "Signup failed. " + (error as { detail: string }).detail,
                variant: "destructive",
            });
            setLoading(false);
        }
    };

    return (
        <>
            {loading ? <CardSkeleton /> :
                <div className="flex flex-col min-h-screen">
                    <OpenNavigation />
                    <main className="flex-grow flex justify-center items-center">
                        <Card className="w-full max-w-md">
                            <CardHeader>
                                <CardTitle>Sign Up</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="container mx-auto p-4">
                                    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                                        <div>
                                            <Label htmlFor="username">Username</Label>
                                            <Input 
                                                type="text" 
                                                id="username" 
                                                placeholder="Enter your username" 
                                                {...register('username')}
                                                className={errors.username ? 'border-red-500' : ''}
                                            />
                                            {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
                                        </div>
                                        <div>
                                            <Label htmlFor="email">Email</Label>
                                            <Input 
                                                type="email" 
                                                id="email" 
                                                placeholder="Enter your email" 
                                                {...register('email')}
                                                className={errors.email ? 'border-red-500' : ''}
                                            />
                                            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                                        </div>
                                        <div>
                                            <Label htmlFor="password">Password</Label>
                                            <Input 
                                                type="password" 
                                                id="password" 
                                                placeholder="Create a password" 
                                                {...register('password')}
                                                className={errors.password ? 'border-red-500' : ''}
                                            />
                                            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                                        </div>
                                        <Button type="submit">Sign Up</Button>
                                    </form>
                                    <p className="mt-4">
                                        Already have an account? <Link href="/login" className="text-blue-500">Login</Link>
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </main>
                </div>}
        </>
    );
}

export default withAuthRedirect(Signup, CardSkeleton, '/dashboard');