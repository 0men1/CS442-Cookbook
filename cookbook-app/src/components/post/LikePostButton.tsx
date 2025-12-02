"use client";

import { like_post, LikeResponse } from "@/data/post";
import { Heart } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";

interface LikePostButtonProps {
  postId: string;
  initialLikeCount: number;
  initialIsLiked: boolean;
  userId?: string | null;
}

export default function LikePostButton({
  postId,
  initialLikeCount,
  initialIsLiked,
  userId
}: LikePostButtonProps) {
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [isLoading, setIsLoading] = useState(false);

  const handleLike = async () => {
    if (isLoading || !userId) return;
    const previousIsLiked = isLiked;
    const previousCount = likeCount;

    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
    setIsLoading(true);

    try {
      const response: LikeResponse = await like_post(postId, userId);

      if (!response) {
        throw new Error("No response");
      } else {
        setIsLiked(response.is_liked);
        setLikeCount(response.like_count);
      }
    } catch (err) {
      setIsLiked(previousIsLiked);
      setLikeCount(previousCount);
      console.error("Failed to like post");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleLike}
      disabled={isLoading || !userId}
      className="flex items-center gap-1.5 text-gray-600 hover:text-red-500 hover:bg-transparent disabled:opacity-50"
    >
      {isLiked ? (
        <Heart className="h-6 w-6 text-red-500 fill-current transition-transform active:scale-90" />
      ) : (
        <Heart className="h-6 w-6 transition-transform active:scale-90" />
      )}
      <span className="font-medium text-base">{likeCount}</span>
    </Button>
  );
}
