'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
import { useRouter } from 'next/navigation';
import { withAuthRedirect } from '@/components/withAuthRedirect';
import { CardSkeleton } from '@/components/card-skeleton';
import { useToast } from '@/hooks/use-toast';
import { authAPI } from '@/api/authAPI';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ChevronLeft } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const schema = z.object({
    new_password: z.string()
        .min(8, "Password must be at least 8 characters long")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter"),
    otp: z.string().min(6, "OTP must be 6 characters long"),
});

function ConfirmFP() {
    const [loading, setLoading] = useState(false);
    const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);
    const { toast } = useToast();
    const router = useRouter();
    // const defaultValues = {
    //     username: '',
    //     email: '',
    //     password: '',
    //     privacy_policy: false,
    // };
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        // setValue,
    } = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        // defaultValues: defaultValues,
    });

    const password = watch("new_password");

    const onSubmit = async (data: z.infer<typeof schema>) => {
        try {
            setLoading(true);
            const username = localStorage.getItem('username');
            const response = await authAPI.confirm_forgot_password(username, {"code": data.otp, "password": data.new_password});
            if (response.status === 200) {
                toast({
                    title: "Success",
                    description: "You have successfully reset your password.",
                    variant: "success",
                    duration: 700,
                });
                router.push('/login');
            }
            setLoading(false);
        } catch (error) {
            toast({
                title: "Error",
                description: "Reset password failed. " + (error as { detail: string }).detail,
                variant: "destructive",
            });
            setLoading(false);
        }
    };

    return (
        <>
            {loading ? <CardSkeleton /> :
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
                            <p className="text-sm text-muted-foreground">Enter the code sent to your registered email to create a new password.</p>
                        </div>
                        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                            
                            <div>
                                <Input 
                                    type="text" 
                                    id="otp" 
                                    placeholder="Enter code sent on email" 
                                    {...register('otp')}
                                    className={errors.otp ? 'border-red-500' : ''}
                                />
                                {errors.otp && <p className="text-red-500 text-sm mt-1">{errors.otp.message}</p>}
                            </div>
                            <div>
                                {/* <Label htmlFor="password">Password</Label> */}
                                <Input 
                                    type="password" 
                                    id="new_password" 
                                    placeholder="Create a new password" 
                                    {...register('new_password')}
                                    className={errors.new_password ? 'border-red-500' : ''}
                                    onFocus={() => setShowPasswordRequirements(true)}
                                />
                                {showPasswordRequirements && (
                                    <Alert className="mt-2">
                                        <AlertDescription>
                                            Password must:
                                            <ul className="list-disc pl-5 mt-2">
                                                <li className={password?.length >= 8 ? 'text-green-500' : ''}>Be at least 8 characters long</li>
                                                <li className={/[0-9]/.test(password || '') ? 'text-green-500' : ''}>Contain at least one number</li>
                                                <li className={/[!@#$%^&*(),.?":{}|<>]/.test(password || '') ? 'text-green-500' : ''}>Contain at least one special character</li>
                                                <li className={/[A-Z]/.test(password || '') ? 'text-green-500' : ''}>Contain at least one uppercase letter</li>
                                                <li className={/[a-z]/.test(password || '') ? 'text-green-500' : ''}>Contain at least one lowercase letter</li>
                                            </ul>
                                        </AlertDescription>
                                    </Alert>
                                )}
                                {errors.new_password && <p className="text-red-500 text-sm mt-1">{errors.new_password.message}</p>}
                            </div>
                            <Button type="submit" className="w-full">Reset Password</Button>
                        </form>
                    </div>
                </div>
            </div>}
        </>
    );
}

export default withAuthRedirect(ConfirmFP, CardSkeleton, '/dashboard');