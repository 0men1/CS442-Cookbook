import PostCard from "./PostCard";

type Post = {
  id: string;
  title: string;
  body: string;
  post_type: string;
  created_at: string;
  image?: string;
};

export default function PostGrid({ posts }: { posts: Post[] }) {
  if (!posts || posts.length === 0) {
    return (
      <p className="text-gray-500 text-center mt-4">
        You haven’t posted anything yet.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          id={post.id}
          title={post.title}
          body={post.body}
          post_type={post.post_type}
          created_at={post.created_at}
          image={post.image || "/assets/sandwich_recipe.jpg"} // dummy fallback, it's all dummy images rn though
        />
      ))}
    </div>
  );
}
