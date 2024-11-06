"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authAPI } from '@/api/authAPI';
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
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

function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { toast } = useToast()
    const router = useRouter();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await authAPI.login({ 
                grant_type: 'password',
                username: username,
                password: password });
            if (response.status === 200) {
                const data = response.data;
                localStorage.setItem('token', data.access_token);
                toast({
                        title: "Success",
                        description: "You have successfully logged in.",
                        variant: "success",
                    })
                
                router.push('/dashboard');
            }
            setLoading(false);
        } catch (error) {
            toast({
                    title: "Error",
                    description: "Login failed. Please check your credentials.",
                    variant: "destructive",
                })
            setLoading(false);
        }
    };

    return (
        <>
        { loading ? <DashboardSkeleton /> :
        <div className="flex flex-col min-h-screen">
            <OpenNavigation /> {/* Your navigation component */}
            <main className="flex-grow flex justify-center items-center">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle>Login</CardTitle>
                        {/* <CardDescription>Deploy your new project in one-click.</CardDescription> */}
                    </CardHeader>
                    <CardContent>
                        <div className="container mx-auto p-4">
                        {/* <h1 className="text-2xl font-bold mb-4">Login</h1> */}
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div>
                            <Label htmlFor="username">Email or Username</Label>
                            <Input type="text" id="username" placeholder="Enter your email or username" onChange={(e) => setUsername(e.target.value)}/>
                            </div>
                            <div>
                            <Label htmlFor="password">Password</Label>
                            <Input type="password" id="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />
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
    )
}

export default withAuthRedirect(Login, CardSkeleton, '/dashboard');