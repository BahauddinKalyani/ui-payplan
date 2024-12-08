'use client'
import React from 'react';
import Link from 'next/link';
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { authAPI } from '@/api/authAPI';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { CardSkeleton } from '@/components/card-skeleton';
import { withAuthRedirect } from '@/components/withAuthRedirect';
import { ChevronLeft } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function EmailConfirmation() {
    
    const { toast } = useToast();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    
    const handleOtpComplete = async (otp: string) => {
        try {
            setLoading(true);
            const response = await authAPI.confirm_signup({ 
                username: localStorage.getItem('username'),
                confirmation_code: otp });
            if (response.status === 200) {
                toast({
                    title: "Success",
                    description: "You have successfully confirmed your email.",
                    variant: "success",
                    duration: 700,
                })
                router.push('/login');
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
            toast({
                title: "Error",
                description: "Signup failed. Please check your confirmation code.",
                variant: "destructive",
                duration: 1000,
            })
            setLoading(false);
        }

    };

    return (
        <>
        { loading ? <CardSkeleton /> :
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
            <div className="flex flex-col min-h-screen">
            <main className="flex-grow flex justify-center items-center">
                <Card className="w-full max-w-md border-none bg-transparent text-center">
                    <CardHeader>
                        <CardTitle>Confirm Your Email</CardTitle>
                        <CardDescription>Enter the confirmation code sent to your email</CardDescription>
                    </CardHeader>
                    <CardContent className="flex justify-center">
                        <div className="space-y-2">
                            <InputOTP maxLength={6} onComplete={handleOtpComplete}>
                                <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                                </InputOTPGroup>
                            </InputOTP>
                            <div className="text-center text-sm">
                                <>Enter confirmation code here.</>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </main>
        </div>
        </div>}
    </>
    );
}

export default withAuthRedirect(EmailConfirmation, CardSkeleton, '/dashboard');