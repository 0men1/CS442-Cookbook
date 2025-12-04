"use client"

import { useSession } from "next-auth/react";
import { DeletePostButton } from "../DeletePostButton";
import { get_comments, Post, PostComment } from "@/data/post";
import { useEffect, useState } from "react";
import CommentForm from "../CommentPostForm";
import LikePostButton from "../LikePostButton";
import Link from "next/link";


function parsePlainTextNewline(raw: string | undefined): string[] {
  if (!raw) return [];

  return raw
    .split("\n")
}



export interface RecipePostProps {
  recipe: Post
}

export function RecipePostDetailPage({ recipe }: RecipePostProps) {
  const { data: session } = useSession();
  const isAuthor = session?.user?.id! === recipe.user.id;
  const [comments, setComments] = useState<PostComment[]>(recipe.comments || []);

  useEffect(() => {
    const fetchComments = async () => {
      const response = await get_comments(recipe.id);
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
            <h1 className="text-4xl font-bold mb-2">{recipe.title}</h1>
            <div className="flex items-center gap-6">
              <p className="text-sm text-muted-foreground">
                <Link
                  href={`/profile/${recipe.user.id}`}
                  className="font-semibold hover:underline"
                >
                  By {recipe.user.username}
                </Link>
                 &nbsp;·&nbsp; {new Date(recipe.created_at).toLocaleDateString()}
              </p>
              <LikePostButton
                postId={recipe.id}
                initialLikeCount={recipe.like_count!}
                initialIsLiked={recipe.is_liked!}
                userId={session?.user.id!}
              />
            </div>
          </div>
          {isAuthor && (
            <DeletePostButton post_id={recipe.id} />
          )}
        </div>
      </header>
      {recipe.images && recipe.images.length > 0 && (
        <section className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recipe.images.map((img) => (
              <figure key={img.id} className="rounded overflow-hidden shadow-sm">
                <img
                  src={`/assets/${img.image_url}`}
                  alt={img.caption ?? "Recipe image"}
                  className="object-cover w-full h-64"
                  loading="lazy"
                />
                {img.caption && (
                  <figcaption className="text-center text-muted-foreground text-sm mt-1">
                    {img.caption}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        </section>
      )}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Ingredients</h2>
        <div className="flex flex-wrap gap-2">
          {parsePlainTextNewline(recipe.ingredients).map((ingredients, index) => (
            <div
              key={index}
              className="px-3 py-1 bg-muted border rounded-md text-sm"
            >
              {ingredients}
            </div>
          ))}
        </div>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Instructions</h2>
        <div className="space-y-3">
          {parsePlainTextNewline(recipe.instructions).map((step, index) => (
            <div
              key={index}
              className="flex items-start gap-3 bg-muted p-4 rounded-md border shadow-sm"
            >
              <div className="font-bold text-primary shrink-0">
                Step {index + 1}
              </div>
              <div className="text-foreground">
                {step}
              </div>
            </div>
          ))}
        </div>
      </section>
      <footer className="border-t pt-4 flex flex-col md:flex-row md:justify-between text-sm text-muted-foreground">
        <span>Last updated: {new Date(recipe.updated_at).toLocaleDateString()}</span>
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

      <CommentForm postId={recipe.id} onCommentAdded={handleNewComment} />
    </article>
  );
}
