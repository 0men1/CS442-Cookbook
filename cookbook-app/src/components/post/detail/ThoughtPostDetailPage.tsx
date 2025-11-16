"use client";
import { ThoughtPost } from "@/types/posts";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useState } from "react";

export interface ThoughtPostDetailPageProps {
  thought: ThoughtPost;
}

export default function ThoughtPostDetailPage({ thought }: ThoughtPostDetailPageProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const isAuthor = session?.user?.id.toString() === thought.user.id;

  const handleDelete = async () => {
    if (!confirm("Delete this thought?")) return;

    setIsDeleting(true);
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/posts/${thought.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <article className="max-w-3xl mx-auto p-6 rounded-md shadow-md">
      <header className="mb-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2">{thought.title}</h1>
            <p className="text-sm text-muted-foreground">
              By <span className="font-semibold">{thought.user.username}</span> &nbsp;·&nbsp;
              {new Date(thought.created_at).toLocaleDateString()}
            </p>
          </div>
          {isAuthor && (
            <Button
              variant="destructive"
              size="icon"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </header>
      {thought.images && thought.images.length > 0 && (
        <div className="mb-6 flex justify-center">
          <img
            src={`/assets/${thought.images[0].image_url}`}
            alt={thought.images[0].caption ?? "Thought image"}
            className="max-h-80 object-contain rounded"
            loading="lazy"
          />
        </div>
      )}
      <section className="mb-8 whitespace-pre-wrap text-lg leading-relaxed">
        {thought.body}
      </section>
      <footer className="text-sm text-muted-foreground">
        Last updated: {new Date(thought.updated_at).toLocaleDateString()}
      </footer>
    </article>
  );
}
