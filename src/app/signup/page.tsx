'use client'
import Link from 'next/link'
import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from 'next/navigation';
import {
    Card,
    CardContent,
    // CardDescription,
    // CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { withAuthRedirect } from '@/components/withAuthRedirect';
import { CardSkeleton } from '@/components/card-skeleton';
import { useToast } from "@/hooks/use-toast"
import { authAPI } from '@/api/authAPI';
import OpenNavigation from '@/components/open-navigation';

function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const data = { 
                given_name: "",
                family_name: "",
                username: username,
                email: email,
                password: password };
            const response = await authAPI.signup(data);
            if (response.status === 200) {
                const data = response.data;
                localStorage.setItem('username', username);
                toast({
                        title: "Success",
                        description: "You have successfully signed up.",
                        variant: "success",
                    })
                router.push('/email-confirmation');
            }
            setLoading(false);
        } catch (error) {
            toast({
                    title: "Error",
                    description: "Signup failed. "+ error.detail,
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
                        <CardTitle>Sign Up</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="container mx-auto p-4">
                            <form className="space-y-4" onSubmit={handleSubmit}>
                                <div>
                                    <Label htmlFor="name">Username</Label>
                                    <Input type="text" id="name" placeholder="Enter your name" onChange={(e) => setUsername(e.target.value)} />
                                </div>
                                <div>
                                    <Label htmlFor="email">Email</Label>
                                    <Input type="email" id="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)}/>
                                </div>
                                <div>
                                    <Label htmlFor="password">Password</Label>
                                    <Input type="password" id="password" placeholder="Create a password" onChange={(e) => setPassword(e.target.value)}/>
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
        </div>}</>
    )
}

export default withAuthRedirect(Signup, CardSkeleton, '/dashboard');