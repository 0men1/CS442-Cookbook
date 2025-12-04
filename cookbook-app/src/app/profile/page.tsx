"use client";

import PostGrid from "@/components/post/PostGrid";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { get_posts_by_username, UserPostsResponse } from "@/data/post";
import { get_user_by_id, User } from "@/data/user";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState<User | null>(null);
  const [userPosts, setUserPosts] = useState<UserPostsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      if (session?.user?.id) {
        setIsLoading(true);
        try {
          // Parallel data fetching for speed
          const [user, posts] = await Promise.all([
            get_user_by_id(session.user.id),
            get_posts_by_username(session.user.username)
          ]);
          setUserData(user);
          setUserPosts(posts);
        } catch (error) {
          console.error("Failed to fetch profile data", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    if (status === "authenticated") {
      getData();
    }
  }, [session, status]);

  if (status === "unauthenticated") return <div>You are not logged in.</div>;

  return (
    <div className="flex min-h-screen">
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
          <p className="">Loading profile...</p>
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
      <main className="flex-1 p-10 space-y-12">
        <h1 className="text-3xl font-semibold mb-4">Welcome back!</h1>

        {/* MY POSTS SECTION */}
        <section>
          <h2 className="text-2xl font-bold mb-4 border-b pb-2">My Posts</h2>
          {isLoading ? (
            <p>Loading your posts...</p>
          ) : userPosts?.posts && userPosts.posts.length > 0 ? (
            <PostGrid posts={userPosts.posts} />
          ) : (
            <p className="text-gray-500 italic">You haven't posted anything yet.</p>
          )}
        </section>

        {/* LIKED POSTS SECTION */}
        <section>
          <div className="flex items-baseline gap-3 mb-4 border-b pb-2">
            <h2 className="text-2xl font-bold">Liked Posts</h2>
            <span className="text-muted-foreground text-sm">
              ({userPosts?.liked_count || 0})
            </span>
          </div>



          {isLoading ? (
            <p>Loading liked posts...</p>
          ) : userPosts?.liked_posts && userPosts.liked_posts.length > 0 ? (
            <PostGrid posts={userPosts.liked_posts} />
          ) : (
            <p className="text-gray-500 italic">You haven't liked any posts yet.</p>
          )}
        </section>
      </main>
    </div>
  );
}
