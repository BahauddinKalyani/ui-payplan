// "use client"
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { authAPI } from '@/api/authAPI';
// import Link from 'next/link'
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { useToast } from '@/hooks/use-toast';
// import {
//   Card,
//   CardContent,
// //   CardDescription,
// //   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import { withAuthRedirect } from '@/components/withAuthRedirect';
// import { CardSkeleton } from '@/components/card-skeleton';
// import { DashboardSkeleton } from '@/components/dashboard-skeleton';
// import OpenNavigation from '@/components/open-navigation';

// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import * as z from 'zod';

// const loginSchema = z.object({
//     username: z.string()
//         .min(1, "Username is required")
//         .refine(value => !/\s/.test(value), "Username should not contain spaces"),
//     password: z.string()
//         .min(8, "Password must be at least 8 characters long")
//         .regex(/[0-9]/, "Password must contain at least one number")
//         .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character")
//         .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
//         .regex(/[a-z]/, "Password must contain at least one lowercase letter"),
// });

// function Login() {
//     const { toast } = useToast();
//     const router = useRouter();
//     const [loading, setLoading] = useState(false);

//     const {
//         register,
//         handleSubmit,
//         formState: { errors },
//     } = useForm<{ username: string; password: string }>({
//         resolver: zodResolver(loginSchema),
//     });

//     const onSubmit = async (data: { username: string; password: string }) => {
//         try {
//             setLoading(true);
//             const response = await authAPI.login({ 
//                 grant_type: 'password',
//                 username: data.username,
//                 password: data.password 
//             });
//             if (response.status === 200) {
//                 const responseData = response.data;
//                 localStorage.setItem('user_id', responseData.user_id);
//                 localStorage.setItem('username', responseData.username);
//                 toast({
//                     title: "Success",
//                     description: "You have successfully logged in.",
//                     variant: "success",
//                 });
//                 router.push('/dashboard');
//             }
//         } catch (error) {
//             console.log(error);
//             toast({
//                 title: "Error",
//                 description: "Login failed. Please check your credentials.",
//                 variant: "destructive",
//             });
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <>
//         { loading ? <DashboardSkeleton /> :
//         <div className="flex flex-col min-h-screen">
//             <OpenNavigation />
//             <main className="flex-grow flex justify-center items-center">
//                 <Card className="w-full max-w-md">
//                     <CardHeader>
//                         <CardTitle>Login</CardTitle>
//                     </CardHeader>
//                     <CardContent>
//                         <div className="container mx-auto p-4">
//                         <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
//                             <div>
//                             <Label htmlFor="username">Email or Username</Label>
//                             <Input 
//                                 type="text" 
//                                 id="username" 
//                                 placeholder="Enter your email or username" 
//                                 {...register('username')}
//                                 className={errors.username ? 'border-red-500' : ''}
//                             />
//                             {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
//                             </div>
//                             <div>
//                             <Label htmlFor="password">Password</Label>
//                             <Input 
//                                 type="password" 
//                                 id="password" 
//                                 placeholder="Enter your password" 
//                                 {...register('password')}
//                                 className={errors.password ? 'border-red-500' : ''}
//                             />
//                             {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
//                             </div>
//                             <Button type="submit">Login</Button>
//                         </form>
//                         <p className="mt-4">
//                             Don&apos;t have an account? <Link href="/signup" className="text-blue-500">Sign up</Link>
//                         </p>
//                         </div>
//                     </CardContent>
//                 </Card>
//             </main>
//         </div>}</>
//     );
// }

// export default withAuthRedirect(Login, CardSkeleton, '/dashboard');


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
    } = useForm<{ username: string; password: string }>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: { username: string; password: string }) => {
        try {
            setLoading(true);
            const response = await authAPI.login({ 
                grant_type: 'password',
                username: data.username,
                password: data.password 
            });
            if (response.status === 200) {
                const responseData = response.data;
                localStorage.setItem('user_id', responseData.user_id);
                localStorage.setItem('username', responseData.username);
                toast({
                    title: "Success",
                    description: "You have successfully logged in.",
                    variant: "success",
                });
                router.push('/dashboard');
            }
        } catch (error) {
            console.log(error);
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
            {loading ? <DashboardSkeleton /> :
                <div className="flex flex-col min-h-screen items-center justify-center px-4 py-8">
                    <div className="w-full max-w-md space-y-8">
                        <div className="flex flex-col gap-2 text-center">
                            <h1 className="text-2xl font-semibold tracking-tight">Welcome to MyTwoney</h1>
                            <p className="text-sm text-muted-foreground">Sign in for an account</p>
                        </div>
                        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                {/* <Label htmlFor="username">Email or Username</Label> */}
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
                                {/* <Label htmlFor="password">Password</Label> */}
                                <Input 
                                    type="password" 
                                    id="password" 
                                    placeholder="Enter your password" 
                                    {...register('password')}
                                    className={errors.password ? 'border-red-500' : ''}
                                />
                                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                            </div>
                            <Button type="submit" className="w-full">Login</Button>
                        </form>
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t"></span>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                            </div>
                        </div>
                        <button className="w-full inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">
                            <svg role="img" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"></path>
                            </svg>
                            Google
                        </button>
                        <p className="text-center mt-4 text-muted-foreground">
                            Don&apos;t have an account? <Link href="/signup" className="text-blue-500">Sign up</Link>
                        </p>
                        <p className="text-center mt-4">
                            <Link href="/signup" className="text-muted-foreground">Forgot password?</Link>
                        </p>
                    </div>
                </div>}
        </>
    );
}

export default withAuthRedirect(Login, DashboardSkeleton, '/dashboard');