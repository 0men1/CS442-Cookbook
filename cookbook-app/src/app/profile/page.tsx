"use client";

import PostGrid from "@/components/post/PostGrid";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import type { Post } from "@/types/posts";

interface UserData {
  id: string;
  username: string;
  is_chef: boolean;
  created_at: string;
  first_name?: string;
  last_name?: string;
}

export default function ProfilePage() {
  const { data: session, status } = useSession();

  const [userData, setUserData] = useState<UserData | null>(null);
  const [userPosts, setUserPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (session?.user?.id) {
      fetch(`http://127.0.0.1:8000/api/users/${session.user.id}/`)
        .then((res) => res.json())
        .then((data: UserData) => setUserData(data))
        .catch((err) => console.error("Error fetching user data:", err));

      fetch(`http://127.0.0.1:8000/api/posts/user/${session.user.username}/`)
        .then((res) => res.json())
        .then((data: { username: string; post_count: number; posts: Post[] }) => {
          setUserPosts(data.posts);
        })
        .catch((err) => console.error("Error fetching user posts:", err));
    }
  }, [session]);

  if (status === "unauthenticated") return <div>You are not logged in.</div>;

  return (
    <div className="flex min-h-screen">
      {/* LEFT SIDEBAR */}
      <aside className="w-1/4 shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">My Profile</h2>

        <img
          src="/assets/default_pfp.png"
          alt="Profile Avatar"
          className="w-42 h-42 rounded-full mx-auto mb-6 border-2 border-gray-600 object-cover"
        />

        {userData ? (
          <div className="flex flex-col items-center text-center mb-20">
            <p className="text-md mb-3">
              <span className=""></span>{" "}
              <span className="">{userData.username}</span>
            </p>
            <p className="text-md mb-3">
              <span className="">Account Type:</span>{" "}
              <span
                className={
                  userData.is_chef ? "text-yellow-300" : "text-blue-300"
                }
              >
                {userData.is_chef ? "Chef!!!" : "Regular User"}
              </span>
            </p>
            <p className="text-md">
              <span className="">Member Since:</span>{" "}
              <span className="">
                {new Date(userData.created_at).toLocaleDateString()}
              </span>
            </p>
          </div>
        ) : (
          <p className="">Loading...</p>
        )}

        {/* Badges */}
        <h2 className="text-2xl font-bold mb-6 text-center">Your Badges</h2>

        <div className="flex flex-wrap justify-center gap-4">
          <img
            src="/assets/first_post.jpg"
            title="First Post"
            className="w-16 h-16 rounded-full border border-gray-600 hover:scale-105 transition-transform"
          />
          <img
            src="/assets/cook_badge.png"
            title="Master Chef"
            className="w-16 h-16 rounded-full border border-gray-600 hover:scale-105 transition-transform"
          />
          <img
            src="/assets/taster_badge.jpg"
            title="Taster"
            className="w-16 h-16 rounded-full border border-gray-600 hover:scale-105 transition-transform"
          />
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-semibold mb-4">Welcome back!</h1>

        <section className="mt-8">
          <h2 className="text-2xl font-bold mb-4">My Posts</h2>
          <PostGrid posts={userPosts} />
        </section>
      </main>
    </div>
  );
}

