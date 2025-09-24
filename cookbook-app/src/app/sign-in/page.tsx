import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaApple, FaGoogle } from "react-icons/fa";



export default function Signin() {
    return (
        <div className="w-full max-w-md mx-auto mt-16 p-8 rounded-lg bg-card text-card-foreground shadow">
            <div>
                <Button><a href="/">Go back home</a> </Button>
            </div>
            <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
            <form className="space-y-5">
                <div>
                    <Label>Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                    />
                </div>
                <div>
                    <Label>Password</Label>
                    <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                    />
                </div>
                <Button variant="default" className="w-full" type="submit">
                    Sign in
                </Button>
            </form>
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