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

export default function Signup() {
  return (

    <div className="flex justify-center items-center h-screen">
    <Card className="w-full max-w-md">
        <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            {/* <CardDescription>Deploy your new project in one-click.</CardDescription> */}
        </CardHeader>
        <CardContent>
            <div className="container mx-auto p-4">
                {/* <h1 className="text-2xl font-bold mb-4"></h1> */}
                <form className="space-y-4">
                    <div>
                        <Label htmlFor="name">Name</Label>
                        <Input type="text" id="name" placeholder="Enter your name" />
                    </div>
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input type="email" id="email" placeholder="Enter your email" />
                    </div>
                    <div>
                        <Label htmlFor="password">Password</Label>
                        <Input type="password" id="password" placeholder="Create a password" />
                    </div>
                    <Button type="submit">Sign Up</Button>
                </form>
                <p className="mt-4">
                    Already have an account? <Link href="/login" className="text-blue-500">Login</Link>
                </p>
            </div>
        </CardContent>
    </Card>
    </div>
  )
}