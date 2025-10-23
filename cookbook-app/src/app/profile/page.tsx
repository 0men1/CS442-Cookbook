"use client";

import { useSession } from "next-auth/react";



export default function ProfilePage() {
    const { data: session, status } = useSession();

    if (status === "unauthenticated") return <div>You are not logged in.</div>
    
    return (
        <div>
            <h1>Profile Page</h1>
            <p>What's cooking, {session?.user?.username}!</p>
            <p>Email {session?.user?.email}</p>
        </div>
    )
}