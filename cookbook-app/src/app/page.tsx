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
  const [ingredientFilters, setIngredientFilters] = useState<string[]>([]);
  const [ingredientInput, setIngredientInput] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | "recipe" | "thought">(
    "all"
  );

  const addIngredientFilter = () => {
    const trimmed = ingredientInput.trim();
    if (!trimmed) return;

    setIngredientFilters((prev) =>
      prev.includes(trimmed.toLowerCase())
        ? prev
        : [...prev, trimmed.toLowerCase()]
    );
    setIngredientInput("");
  };

  const removeIngredientFilter = (ing: string) => {
    setIngredientFilters((prev) => prev.filter((i) => i !== ing));
  };

  const handleIngredientKeyDown = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addIngredientFilter();
    }
  };

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

  const filteredPosts = posts.filter((post) => {
    const matchesTitle = post.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesType = typeFilter === "all" || post.post_type === typeFilter;

    let matchesIngredient = true;

    if (ingredientFilters.length > 0) {
      if ("ingredients" in post && typeof post.ingredients === "string") {
        const ingredientsText = post.ingredients.toLowerCase();
        matchesIngredient = ingredientFilters.every((f) =>
          ingredientsText.includes(f)
        );
      } else {
        matchesIngredient = false;
      }
    }

    return matchesTitle && matchesType && matchesIngredient;
  });

  return (
    <div className="flex flex-col gap-5 w-full h-full items-center">
      <div className="p-6 w-full max-w-7xl">
        <div className="flex justify-center gap-2 mb-4">
          <Button
            className="h-10"
            variant={typeFilter === "all" ? "default" : "outline"}
            onClick={() => setTypeFilter("all")}
          >
            All
          </Button>
          <Button
            className="h-10"
            variant={typeFilter === "thought" ? "default" : "outline"}
            onClick={() => setTypeFilter("thought")}
          >
            Thoughts
          </Button>
          <Button
            className="h-10"
            variant={typeFilter === "recipe" ? "default" : "outline"}
            onClick={() => setTypeFilter("recipe")}
          >
            Recipes
          </Button>

          <div className="flex justify-center mb-4">
            <SearchBar
              onSearch={(q) => setSearchQuery(q)}
              placeholder="Search posts by title..."
            />
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4 justify-center">
            <input
              type="text"
              value={ingredientInput}
              onChange={(e) => setIngredientInput(e.target.value)}
              onKeyDown={handleIngredientKeyDown}
              placeholder="Add ingredients to filter..."
              className="w-full max-w-md h-10 px-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button
              className="h-10"
              type="button"
              onClick={addIngredientFilter}
              disabled={!ingredientInput.trim()}
            >
              Add
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {ingredientFilters.map((ing) => (
              <span
                key={ing}
                className="flex items-center gap-1 px-2 py-1 rounded-full bg-zinc-800 text-m text-gray-100"
              >
                {ing}
                <button
                  type="button"
                  onClick={() => removeIngredientFilter(ing)}
                  className="text-gray-400 hover:text-gray-200"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        </div>

        <PostGrid posts={filteredPosts} />
      </div>

      <div className="fixed bottom-6 right-6">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" className="h-14 w-14 rounded-full shadow-lg" data-testid="create-post">
              <Plus className="h-6 w-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem asChild>
              <a
                href="/create/thought"
                className="flex items-center gap-2 cursor-pointer"
                data-testid = "tht-post"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Thought Post</span>
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a
                href="/create/recipe"
                className="flex items-center gap-2 cursor-pointer"
                data-testid = "rcp-post"
              >
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
