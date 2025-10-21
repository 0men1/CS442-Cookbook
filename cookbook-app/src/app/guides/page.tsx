"use client";

import RecipeGrid from "@/components/recipe/RecipeGrid";
import SearchBar from "@/components/SearchBar";
import { useState } from "react";

export default function GuidesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // Hardcoded guide data for now
  const guides = [
    { id: "1", title: "How to Mince Onions", image: "/assets/mince_onion.jpg" },
    { id: "2", title: "Boiling Pasta Perfectly", image: "/assets/boil_pasta.jpg" },
    { id: "3", title: "Knife Safety Basics", image: "/assets/knife_safety.jpg" },
    { id: "4", title: "Making a Roux", image: "/assets/roux.jpg" },
  ];

  const filteredGuides = guides.filter((guide) =>
    guide.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-5 w-full h-full items-center">
      <div className="p-6">
        <div className="flex justify-center mb-6">
          <SearchBar onSearch={(q) => setSearchQuery(q)} placeholder="Search guides..." />
        </div>
        <RecipeGrid recipes={filteredGuides} />
      </div>
    </div>
  );
}
