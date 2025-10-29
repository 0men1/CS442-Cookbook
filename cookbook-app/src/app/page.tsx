"use client";

import PostGrid from "@/components/post/PostGrid";
import SearchBar from "@/components/SearchBar";
import { Post } from "@/types/posts";
import { useEffect, useState } from "react";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/posts/`);
        if (!res.ok) throw new Error("Failed to fetch posts");
        const data: Post[] = await res.json();
        if (data) {
          setPosts(data);
        }
      } catch (error) {
        console.error("Error fetching posts: ", error);
      }
    }
    fetchPosts();
  }, []);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-5 w-full h-full items-center">
      <div className="p-6 w-full max-w-7xl">
        <div className="flex justify-center mb-6">
          <SearchBar
            onSearch={(q) => setSearchQuery(q)}
            placeholder="Search posts by title..."
          />
        </div>

        <PostGrid posts={filteredPosts} />
      </div>
    </div>
  );
}
