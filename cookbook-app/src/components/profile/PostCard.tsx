import Link from "next/link";

type PostCardProps = {
  id: string;
  title: string;
  body: string;
  post_type: string;
  created_at: string;
  image?: string;
};

export default function PostCard({
  id,
  title,
  body,
  post_type,
  created_at,
  image = "assets/sandwich_recipe.jpg", // dummy image for now
}: PostCardProps) {
  return (
    <Link href={`/posts/${id}`}>
      <div className="cursor-pointer rounded-lg overflow-hidden shadow hover:shadow-lg transition bg-zinc-800 border border-zinc-700">
        <img
          src={image}
          alt={title}
          className="w-full h-40 object-cover"
        />
        <div className="p-3">
          <h2 className="text-lg font-semibold text-gray-100 mb-1">
            {title}
          </h2>
          <p className="text-gray-400 text-sm mb-1">
            Type: {post_type.toUpperCase()}
          </p>
          <p className="text-gray-300 text-sm line-clamp-2">
            {body}
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Posted on {new Date(created_at).toLocaleDateString()}
          </p>
        </div>
      </div>
    </Link>
  );
}
