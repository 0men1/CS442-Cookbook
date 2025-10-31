import { ThoughtPost } from "@/types/posts";

export interface ThoughtPostDetailPageProps {
  thought: ThoughtPost;
}

export default function ThoughtPostDetailPage({ thought }: ThoughtPostDetailPageProps) {
  return (
    <article className="max-w-3xl mx-auto p-6 rounded-md shadow-md">
      <header className="mb-6">
        <h1 className="text-4xl font-bold mb-2">{thought.title}</h1>
        <p className="text-sm text-gray-500">
          By <span className="font-semibold">{thought.user.username}</span> &nbsp;·&nbsp;
          {new Date(thought.created_at).toLocaleDateString()}
        </p>
      </header>

      {thought.images && thought.images.length > 0 && (
        <div className="mb-6 flex justify-center">
          <img
            src={`/assets/${thought.images[0].image_url}` ?? ""}
            alt={thought.images[0].caption ?? "Thought image"}
            className="max-h-80 object-contain rounded"
            loading="lazy"
          />
        </div>
      )}

      <section className="mb-8 whitespace-pre-wrap text-lg leading-relaxed">
        {thought.body}
      </section>

      <footer className="text-sm text-gray-500">
        Last updated: {new Date(thought.updated_at).toLocaleDateString()}
      </footer>
    </article>
  );
}

