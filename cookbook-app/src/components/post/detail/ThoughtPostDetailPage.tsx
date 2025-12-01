"use client"

import { ThoughtPost } from "@/types/posts";
import { useSession } from "next-auth/react";
import { DeletePostButton } from "../DeletePostButton";
import CommentForm from "../CommentPostForm";
import { get_comments, PostComment } from "@/data/post";
import { useEffect, useState } from "react";

export interface ThoughtPostDetailPageProps {
  thought: ThoughtPost;
}

export default function ThoughtPostDetailPage({ thought }: ThoughtPostDetailPageProps) {
  const { data: session } = useSession();
  const isAuthor = session?.user?.id === thought.user.id;

  const [comments, setComments] = useState<PostComment[]>(thought.comments || []);

  useEffect(() => {
    const fetchComments = async () => {
      const response = await get_comments(thought.id);
      if (response) {
        setComments(response)
      }
    }
    fetchComments()
  }, [])

  const handleNewComment = (newComment: PostComment) => {
    setComments((prev) => [...prev, newComment]);
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
            <DeletePostButton post_id={thought.id} />
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

      {/* Comments List */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="border-b p-2">
            <span className="font-bold">{comment.user.username}</span>
            <p>{comment.body}</p>
          </div>
        ))}
      </div>

      <CommentForm postId={thought.id} onCommentAdded={handleNewComment} />
    </article>
  );
}
