"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "@/lib/auth/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";



export default function SignIn() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    async function handleSubmit(e:React.FormEvent) {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const result = await signIn.email({
                email,
                password,
            });
            if (result.error) {
                setError(result.error.message ?? "Failed to SignIn");
            } else {
                router.push("/dashboard");
            }
        } catch (error) {
            setError("An unexpected error occured");
            return error;
        } finally {
            setLoading(false);
        }

    }

    return (
        <div className="flex min-h[calc(100vh-4rem)] items-center justify-center bg-white p-4">
           <Card className="w-full max-w-md border-gray-200 shadow-lg">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-black">
                    Sign In
                </CardTitle>
                   <CardDescription className="text-gray-600">
                    Sign in to your account to Start tracking your job applications
                    </CardDescription> 
                
                </CardHeader>
                  
                  <form 
                  onSubmit={handleSubmit}
                  className="space-y-4">
                    <CardContent className="space-y-4">

                       {error && (
                    <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                        {error}
                        </div>
                        )} 
                       
                    
                         <div className="space-y-2">
                           <Label htmlFor="email" className="text-gray-700">Email</Label>
                           <Input 
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           className="border-gray-300 focus:border-primary focus:ring-primary"
                           id="email" type="email" placeholder="JohnDoe@example.com" required/>
                        </div>

                         <div className="space-y-2">
                           <Label htmlFor="password" className="text-gray-700">Password</Label>
                           <Input
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                           minLength={8}
                           className="border-gray-300 focus:border-primary focus:ring-primary"
                            id="password" type="password" placeholder="JohnDoe123" required/>
                        </div>
                    </CardContent>

                    <CardFooter className="flex flex-col space-y-4">
                        <Button 
                        disabled={loading}
                        className="w-full bg-primary hover:bg-primary/90"
                        type="submit">
                            {loading ? "Signing In..." : "Sign In"}
                        </Button>

                        <p className="text-center text-sm text-gray-600">Don&apos;t have an account?{" "} <Link 
                        className="font-medium text-primary hover:underline"
                        href="/sign-up">Sign Up</Link></p>
                    </CardFooter>
                  </form>


                </Card> 
        </div>
    );
}