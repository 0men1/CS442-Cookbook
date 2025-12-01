"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { FaApple, FaGoogle } from "react-icons/fa"

import * as z from "zod"
import { UserRegisterSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { user_register } from "@/data/auth"

export default function() {
    const [isLoading, setIsLoading] = useState(false)
    const [serverError, setServerError] = useState("")
    const [success, setSuccess] = useState("")

    const form = useForm<z.infer<typeof UserRegisterSchema>>({
        resolver: zodResolver(UserRegisterSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirm_password: "",
        }
    })

    const router = useRouter()

    const onSubmit = async (values: z.infer<typeof UserRegisterSchema>) => {
        setIsLoading(true)
        setServerError("")
        setSuccess("")

        try {
            const data = await user_register(values)

            if (data) {
                setSuccess("Account created successfully!")
                form.reset()
                setTimeout(() => router.push("/login"), 1000)
            } else {
                if (data && typeof data == 'object') {
                    Object.keys(data).forEach((fieldName) => {
                        if (fieldName in form.getValues()) {
                            form.setError(fieldName as keyof z.infer<typeof UserRegisterSchema>, {
                                type: 'server',
                                message: Array.isArray(data[fieldName]) ? data[fieldName][0] : data[fieldName]
                            })
                        } else if (fieldName == "non_field_errors") {
                            setServerError(data[fieldName][0] || "An error occurred")
                        }
                    })
                } else {
                    setServerError("Internal Error")
                }
            }
        } catch (error) {
            setServerError("Network error. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="w-full max-w-md mx-auto mt-16 p-8 rounded-lg bg-card text-card-foreground shadow">
            <div>
                <Button><a href="/">Go back home</a></Button>
            </div>

            <h2 className="text-2xl font-bold mb-6 text-center">Sign up</h2>

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
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        type="email"
                                        placeholder="Enter your email"
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
                                        placeholder="Create a password"
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
                        name="confirm_password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="Confirm your password"
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
                        {isLoading ? "Creating Account..." : "Sign up"}
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
                            Or sign up with
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
