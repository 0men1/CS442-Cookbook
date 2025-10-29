import { RecipePost } from "@/types/posts";
import RecipeCard from "./RecipeCard";

export default function RecipeGrid({ recipes }: { recipes: RecipePost[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          id={recipe.id}
          title={recipe.title}
          image={`/assets/sandwich_recipe.jpg`}
        />
      ))}
    </div>
  );
}
