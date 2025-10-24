"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import PostGrid from "@/components/profile/PostGrid";

type UserData = {
  id: string;
  first_name: string;
  last_name: string;
  username: string;
  is_chef: boolean;
  created_at: string;
  updated_at: string;
};

type Post = {
  id: string;
  post_type: string;
  title: string;
  body: string;
  created_at: string;
};

export default function ProfilePage() {
  const { data: session, status } = useSession();

  const [userData, setUserData] = useState<UserData | null>(null);

  const [userPosts, setUserPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (session?.user?.id) {
      //fetches user data
      fetch(`http://127.0.0.1:8000/api/users/${session.user.id}/`)
        .then((res) => res.json())
        .then((data) => setUserData(data))
        .catch((err) => console.error("Error fetching user data:", err));

      //fetches user posts
      fetch(`http://127.0.0.1:8000/api/posts/user/${session.user.username}/`)
        .then((res) => res.json())
        .then((data) => {
          setUserPosts(data.posts);
          console.log("DEBUG-> Raw posts data:", data);

        })
        .catch((err) => console.error("Error fetching user posts:", err));
    }
  }, [session]);

  if (status === "unauthenticated") return <div>You are not logged in.</div>;

  return (
    <div className="flex min-h-screen bg-zinc-900 text-gray-200">
      {/* LEFT SIDEBAR */}
      {/* <pre className="text-gray-400 text-xs">
        {JSON.stringify(userData, null, 2)}
      </pre> */}
      <aside className="w-1/4 bg-zinc-800 shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-100 text-center">
          My Profile
        </h2>

        <img
          src="/assets/default_pfp.png"
          alt="Profile Avatar"
          className="w-42 h-42 rounded-full mx-auto mb-6 border-2 border-gray-600 object-cover"
        />

        {userData ? (
          <div className="flex flex-col items-center text-center">
            {/* <p className="text-md mb-3">
                <span className="text-gray-400">Full Name:</span>{" "}
                <span className="text-gray-100">
                {userData.first_name || "(none)"} {userData.last_name}
                </span>
            </p> */}
            <p className="text-md mb-3">
              <span className="text-gray-400"></span>{" "}
              <span className="text-gray-100">{userData.username}</span>
            </p>
            <p className="text-md mb-3">
              <span className="text-gray-400">Account Type:</span>{" "}
              <span
                className={
                  userData.is_chef ? "text-yellow-300" : "text-blue-300"
                }
              >
                {userData.is_chef ? "Chef!!!" : "Regular User"}
              </span>
            </p>
            <p className="text-md">
              <span className="text-gray-400">Member Since:</span>{" "}
              <span className="text-gray-100">
                {new Date(userData.created_at).toLocaleDateString()}
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
        <ul className="list-disc ml-6 mt-3 text-gray-300">
          <h2 className="text-2xl font-bold text-gray-100 mt-8 mb-4">
            My Posts
          </h2>
          <PostGrid posts={userPosts} />
        </ul>
      </main>
    </div>
  );
}
