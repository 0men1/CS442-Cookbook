/*
* The Recipe Page
* takes the recipe id from the URL, looks for a public/recipes/{id}.json
* populates an html page with the info from the json
* */



// TODO: Fetch recipe DETAILS from backend & Setup endpoint to do it

import { RecipePost } from "@/types/posts";

async function getRecipe(id: string): Promise<RecipePost> {
  try {
    const res = await fetch(`http://localhost:3000/recipes/${id}.json`)

    if (!res.ok) return theNullRecipe;

    return await res.json(); // JSON automatically converted to JS object
  } catch (error) {

    return theNullRecipe;
  }
  /* I imagine this would change out to localhost:8000 to get json from our SQL Django DB, this is here to make it easier for later hopefully */
}

export default async function RecipePage({ params }: { params: { id: string } }) {

  const { id } = await params;
  const recipe = await getRecipe(id);

  /* not finding a recipe is already handled by getRecipe */

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Title */}
      <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4 text-center">
        {recipe.title}
      </h1>

      {/* Image */}
      <div className="flex justify-center mb-6">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-2/3 h-80 object-cover rounded-xl shadow-lg"
        />
      </div>

      {/* Description */}
      <p className="text-gray-700 dark:text-gray-300 text-lg mb-6 leading-relaxed">
        {recipe.description}
      </p>

      {/* Steps */}
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
        Steps
      </h2>
      <ol className="list-decimal list-inside space-y-2">
        {recipe.steps.map((step, idx) => (
          <li
            key={idx}
            className="bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-3 rounded-lg shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            {step}
          </li>
        ))}
      </ol>
    </div>
  );
}
