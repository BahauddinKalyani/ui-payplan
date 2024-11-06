'use client'
import React from 'react';
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { authAPI } from '@/api/authAPI';
import { useToast } from "@/hooks/use-toast";
import { useRouter } from 'next/navigation';
import OpenNavigation from '@/components/open-navigation';
import { CardSkeleton } from '@/components/card-skeleton';
import { withAuthRedirect } from '@/components/withAuthRedirect';

function EmailConfirmation() {
    
    const { toast } = useToast();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    
    const handleOtpComplete = async (otp) => {
        try {
            setLoading(true);
            const response = await authAPI.confirm_signup({ 
                username: localStorage.getItem('username'),
                confirmation_code: otp });
            if (response.status === 200) {
                const data = response.data;
                toast({
                    title: "Success",
                    description: "You have successfully confirmed your email.",
                    variant: "success",
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
            })
            setLoading(false);
        }

    };

    return (
        <>
        { loading ? <CardSkeleton /> :
        <div className="flex flex-col min-h-screen">
        <OpenNavigation /> {/* Your navigation component */}
        <main className="flex-grow flex justify-center items-center">
            <Card className="w-full max-w-md">
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
    </div>}</>
    );
}

export default withAuthRedirect(EmailConfirmation, CardSkeleton, '/dashboard');