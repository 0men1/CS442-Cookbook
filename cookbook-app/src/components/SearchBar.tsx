"use client";

import { useState } from "react";

type SearchBarProps = {
  onSearch: (query: string) => void;
  placeholder?: string;
};

export default function SearchBar({ onSearch, placeholder }: SearchBarProps) {
  const [input, setInput] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setInput(value);
    onSearch(value);
  }

  return (
    <div className="mb-6">
      <input
        type="text"
        value={input}
        onChange={handleChange}
        placeholder={placeholder || "Search..."}
        className="w-full max-w-md px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  );
}
