"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { UserLoginSchema } from "@/schemas";
import { FaApple, FaGoogle } from "react-icons/fa";

import * as z from "zod"
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";



export default function() {
    const form = useForm<z.infer<typeof UserLoginSchema>>({
        resolver: zodResolver(UserLoginSchema),
        defaultValues: {
            username: "",
            password: ""
        },
    });


    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [serverError, setServerError] = useState<string>("")
    const [success, setSuccess] = useState<string>("")

    const router = useRouter()

    const onSubmit = async (values: z.infer<typeof UserLoginSchema>) => {
        setIsLoading(true)
        setServerError("")
        setSuccess("")

        try {
            const result = await signIn("credentials", {
                username: values.username,
                password: values.password,
                redirect: false,
            });

            if (result?.error) {
                setServerError("Invalid username or password");
            } else if (result?.ok) {
                setSuccess("Successfully logged in! Redirecting...");
                form.reset();
                setTimeout(() => router.push("/"), 1000);
            }
        } catch (error) {
            console.error("Login error:", error);
            setServerError("Network Error. Please try again.");
        } finally {
            setIsLoading(false);
        }

    }

    return (
        <div className="w-full max-w-md mx-auto mt-16 p-8 rounded-lg bg-card text-card-foreground shadow">
            <div>
                <Button><a href="/">Go back home</a> </Button>
            </div>
            <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>

            {/* Success Message */}
            {success && (
                <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                    {success}
                </div>
            )}

            {/* Server Error Message */}
            {serverError && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                    {serverError}
                </div>
            )}

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        placeholder="Enter your username"
                                        disabled={isLoading}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />


                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="Enter your password"
                                        disabled={isLoading}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        variant="default"
                        className="w-full"
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? "Signing in..." : "Sign in"}
                    </Button>
                </form>
            </Form>
            <div className="mt-6">
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-card px-2 text-muted-foreground">
                            Or sign in with
                        </span>
                    </div>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-3">
                    <Button variant="outline" className="w-full hover:cursor-pointer">
                        <FaGoogle />
                    </Button>
                    <Button variant="outline" className="w-full hover:cursor-pointer">
                        <FaApple />
                    </Button>
                </div>
            </div>

        </div>
    )
}
