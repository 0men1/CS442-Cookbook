import PostCard from "./PostCard";
import { Post as PostType } from "@/types/posts";

export default function PostGrid({ posts }: { posts: PostType[] }) {
  if (!posts || posts.length === 0) {
    return (
      <p className="text-gray-500 text-center mt-4">
        You haven’t posted anything yet.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
      {posts.map((post) => {
        // Extract image URL: if images field available and non-empty, use first image's url (image_url or image_url fallback)
        let imageUrl: string | undefined;

        if ("images" in post && post.images && post.images.length > 0) {
          imageUrl = post.images[0].image_url ?? (post.images[0].image_url ?? undefined);
        }

        // Fallback dummy image URL if no images
        if (!imageUrl) {
          imageUrl = "/assets/sandwich_recipe.jpg";
        }

        return (
          <PostCard
            key={post.id}
            id={post.id}
            title={post.title}
            body={post.body}
            post_type={post.post_type}
            created_at={post.created_at}
            image={imageUrl}
          />
        );
      })}
    </div>
  );
}

