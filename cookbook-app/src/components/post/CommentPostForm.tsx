"use client";

import { create_comment, PostComment } from "@/data/post";
import { useSession } from "next-auth/react";
import { useState, FormEvent } from "react";

interface CommentFormProps {
  postId: number;
  onCommentAdded?: (newComment: PostComment) => void;
}

export default function CommentForm({ postId, onCommentAdded }: CommentFormProps) {
  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const session = useSession()

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!body.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await create_comment(postId, { body, user_id: session.data?.user.id });

      if (!response) {
        setError("Failed to post comment.");
        console.error(response);
      } else if (response) {
        setBody("");
        if (onCommentAdded) {
          onCommentAdded(response);
        }
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-2">
      <textarea
        className="w-full rounded-md border p-2 text-sm focus:border-blue-500 focus:outline-none"
        placeholder="Add a comment..."
        rows={3}
        value={body}
        onChange={(e) => setBody(e.target.value)}
        disabled={isLoading}
      />

      {error && <p className="text-xs text-red-500">{error}</p>}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading || !body.trim()}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:bg-gray-400"
        >
          {isLoading ? "Posting..." : "Post Comment"}
        </button>
      </div>
    </form>
  );
}
