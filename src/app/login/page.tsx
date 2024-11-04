"use client"
import { useState } from 'react';
import { useRouter } from 'next/router';
import { authAPI } from '@/api/authAPI';
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // const router = useRouter();
    
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await authAPI.login({ 
                grant_type: 'password',
                username: username,
                password: password });
            console.log('Login successful:', response);
          // Handle successful login (e.g., store token, redirect)
        //   localStorage.setItem('token', response.token);
        //   router.push('/dashboard');
        } catch (error) {
          console.error('Login failed:', error);
          // Handle login error (e.g., show error message)
        }
    };


    return (
        <div className="flex justify-center items-center h-screen">
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
        </div>
    )
}