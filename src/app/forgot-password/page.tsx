'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authAPI } from '@/api/authAPI';
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
import { useToast } from '@/hooks/use-toast';
import { withAuthRedirect } from '@/components/withAuthRedirect';
import { DashboardSkeleton } from '@/components/dashboard-skeleton';
// import OpenNavigation from '@/components/open-navigation';
import { ChevronLeft } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const loginSchema = z.object({
    username: z.string()
        .min(1, "Username is required")
        .refine(value => !/\s/.test(value), "Username should not contain spaces"),
});

function ForgotPassword() {
    const { toast } = useToast();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<{ username: string; password: string }>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: { username: string; }) => {
        try {
            setLoading(true);
            localStorage.setItem('username', data.username);
            const response = await authAPI.forgot_password(data.username);
            if (response.status === 200) {
                // const responseData = response.data;
                toast({
                    title: "Success",
                    description: "A password reset code has been sent to your email. Please check your inbox!",
                    variant: "success",
                });
                router.push('/confirm-forgot-password');
            }
        } catch (error: any) {
            console.log(error);
            toast({
                title: "Error",
                description: error.detail,
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {loading ? <DashboardSkeleton /> :
            <div className="container flex h-screen w-screen flex-col items-center justify-center">
                <Link
                href="/"
                className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "absolute left-4 top-4 md:left-8 md:top-8"
                )}
                >
                <>
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Back
                </>
                </Link>
                <div className="flex flex-col min-h-screen items-center justify-center gap-6 mx-auto sm:w-[350px]">
                    <div className="w-full max-w-md space-y-8">
                        <div className="flex flex-col gap-2 text-center">
                            <h1 className="text-2xl font-semibold tracking-tight">Reset your password</h1>
                            <p className="text-sm text-muted-foreground">Enter the username or email associated with your account to reset your password.</p>
                        </div>
                        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <Input 
                                    type="text" 
                                    id="username" 
                                    placeholder="Enter your username or email" 
                                    {...register('username')}
                                    className={errors.username ? 'border-red-500' : ''}
                                />
                                {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
                            </div>
                            <Button type="submit" className="w-full">Continue</Button>
                        </form>
                    </div>
                </div>
            </div>}
        </>
    );
}

export default withAuthRedirect(ForgotPassword, DashboardSkeleton, '/dashboard');