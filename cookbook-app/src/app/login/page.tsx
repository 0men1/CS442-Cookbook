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



export default function() {
    const form = useForm<z.infer<typeof UserLoginSchema>>({
        resolver: zodResolver(UserLoginSchema),
        defaultValues: {
            username: "",
            password: ""
        },
    });

    const router = useRouter()

    const onSubmit = async (values: z.infer<typeof UserLoginSchema>) => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/users/login/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                //credentials: "include",
                body: JSON.stringify(values)
            })

            const data = await response.json()


            console.log(data)

            if (response.ok) {
                form.reset()
                setTimeout(() => router.push("/"), 1000)
            } else {
                // Handle server validation errors however you want (e.g., password dont match, email taken, username taken)
            }
        } catch (error) {
            console.error(error)
        } finally {
        }

    }

    return (
        <div className="w-full max-w-md mx-auto mt-16 p-8 rounded-lg bg-card text-card-foreground shadow">
            <div>
                <Button><a href="/">Go back home</a> </Button>
            </div>
            <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
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
                                        // disabled={isLoading}
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
                                        //disabled={isLoading}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button variant="default" className="w-full" type="submit">
                        Sign in
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
