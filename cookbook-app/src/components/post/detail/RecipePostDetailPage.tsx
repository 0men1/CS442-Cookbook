import { RecipePost } from "@/types/posts"


export interface RecipePostProps {
  recipe: RecipePost
}

export function RecipePostDetailPage({ recipe }: RecipePostProps) {
  return (
    <article className="max-w-3xl mx-auto p-6 rounded-md shadow-md">
      <header className="mb-6">
        <h1 className="text-4xl font-bold mb-2">{recipe.title}</h1>
        <p className="text-sm text-gray-500">
          By <span className="font-semibold">{recipe.user.username}</span> &nbsp;·&nbsp;
          {new Date(recipe.created_at).toLocaleDateString()}
        </p>
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
                  <figcaption className="text-center text-gray-600 text-sm mt-1">
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
        <pre className="whitespace-pre-wrap bg-gray-50 p-4 rounded border border-gray-200 text-gray-800">
          {recipe.ingredients}
        </pre>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Instructions</h2>
        <pre className="whitespace-pre-wrap bg-gray-50 p-4 rounded border border-gray-200 text-gray-800">
          {recipe.instructions}
        </pre>
      </section>

      <footer className="border-t pt-4 flex flex-col md:flex-row md:justify-between text-sm text-gray-500">
        <span>Last updated: {new Date(recipe.updated_at).toLocaleDateString()}</span>
      </footer>
    </article>
  );
}

