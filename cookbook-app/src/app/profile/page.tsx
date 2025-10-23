"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

type UserData = {
  id: string;
  first_name: string;
  last_name: string;
  username: string;
  is_chef: boolean;
  createdAt: string;
};


export default function ProfilePage() {
    const { data: session, status } = useSession();

    const [userData, setUserData] = useState<UserData | null>(null);

    useEffect(() => {
        if (session?.user?.id) {
            fetch(`http://127.0.0.1:8000/api/users/${session.user.id}/`)
            .then((res) => res.json())
            .then((data) => setUserData(data))
            .catch((err) => console.error("Error fetching user data:", err));
        }
    }, [session]);


    if (status === "unauthenticated") return <div>You are not logged in.</div>
    




    return (
    <div className="flex min-h-screen bg-zinc-900 text-gray-200">
        {/* LEFT SIDEBAR */}
        <aside className="w-1/4 bg-zinc-800 shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-100 text-center">
            My Profile
        </h2>

        {userData ? (
            <div>
            {/* <p className="text-md mb-3">
                <span className="text-gray-400">Full Name:</span>{" "}
                <span className="text-gray-100">
                {userData.first_name || "(none)"} {userData.last_name}
                </span>
            </p> */}
            <p className="text-md mb-3">
                <span className="text-gray-400">Username:</span>{" "}
                <span className="text-gray-100">{userData.username}</span>
            </p>
            <p className="text-md mb-3">
                <span className="text-gray-400">Account Type:</span>{" "}
                <span
                className={userData.is_chef ? "text-yellow-300" : "text-blue-300"}
                >
                {userData.is_chef ? "Chef!!!" : "Regular User"}
                </span>
            </p>
            <p className="text-md">
                <span className="text-gray-400">Member Since:</span>{" "}
                <span className="text-gray-100">
                {new Date(userData.createdAt).toLocaleDateString()}
                </span>
            </p>
            </div>
        ) : (
            <p className="text-gray-500">Loading...</p>
        )}
        </aside>

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 p-10">
        <h1 className="text-3xl font-semibold mb-4 text-gray-100">
            Welcome back!
        </h1>
        <p className="text-gray-400">
            This will be your dashboard area where we can later add:
        </p>
        <ul className="list-disc ml-6 mt-3 text-gray-300">
            <li>Your recipes</li>
            <li>Your guides</li>
            <li>Recent activity</li>
        </ul>
        </main>
    </div>
    );



}