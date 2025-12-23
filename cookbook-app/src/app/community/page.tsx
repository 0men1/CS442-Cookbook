"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { get_all_users, User } from "@/data/user";
import { get_posts_by_username } from "@/data/post";

type UserWithPostCount = User & {
  post_count: number;
};

export default function UsersPage() {
  const [users, setUsers] = useState<UserWithPostCount[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      setLoading(true);
      try {
        const allUsers = await get_all_users();

        const usersWithCounts = await Promise.all(
          allUsers.map(async (u) => {
            const postsResponse = await get_posts_by_username(u.username);
            const posts = postsResponse.posts || [];
            return {
              ...u,
              post_count: posts.length,
            };
          })
        );

        setUsers(usersWithCounts);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  const filtered = users.filter((user) =>
    user.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-10 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Users</h1>

      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 mb-6 rounded-md text-white border border-zinc-700"
      />

      {loading ? (
        <p>Loading...</p>
      ) : filtered.length === 0 ? (
        <p className="text-gray-500">No users found.</p>
      ) : (
        <ul className="space-y-4">
          {filtered.map((user) => (
            <li
              key={user.id}
              className="flex items-center justify-between p-4 rounded-md border border-zinc-700 hover:bg-zinc-300 transition"
            >
              <div className="flex items-center gap-4">
                <img
                  src="/assets/default_pfp.png"
                  className="w-12 h-12 rounded-full border border-gray-600"
                />

                <div>
                  <p className="text-lg font-semibold">{user.username}</p>

                  <p className="text-gray-400 text-sm">
                    {user.post_count} post{user.post_count !== 1 ? "s" : ""}
                  </p>

                  <p className="text-gray-500 text-xs">
                    Joined {new Date(user.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <Link
                href={`/profile/${user.id}`}
                className="hover:underline"
              >
                View Profile
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
