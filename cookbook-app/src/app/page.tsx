"use client";
import PostGrid from "@/components/post/PostGrid";
import SearchBar from "@/components/SearchBar";
import { useEffect, useState } from "react";
import { Plus, MessageSquare, UtensilsCrossed } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { get_all_posts, Post } from "@/data/post";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await get_all_posts();
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

      <div className="fixed bottom-6 right-6">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" className="h-14 w-14 rounded-full shadow-lg">
              <Plus className="h-6 w-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem asChild>
              <a href="/create/thought" className="flex items-center gap-2 cursor-pointer">
                <MessageSquare className="h-4 w-4" />
                <span>Thought Post</span>
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a href="/create/recipe" className="flex items-center gap-2 cursor-pointer">
                <UtensilsCrossed className="h-4 w-4" />
                <span>Recipe Post</span>
              </a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
