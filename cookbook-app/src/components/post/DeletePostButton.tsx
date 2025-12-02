"use client"

import { delete_post } from "@/data/post";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";

interface DeletePostButtonProps {
  post_id: string
}

export function DeletePostButton({ post_id }: DeletePostButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Delete this recipe?")) return;
    setIsDeleting(true);
    try {
      await delete_post(post_id)
      router.push("/");
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Button
      variant="destructive"
      size="icon"
      onClick={handleDelete}
      disabled={isDeleting}
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  )
}
