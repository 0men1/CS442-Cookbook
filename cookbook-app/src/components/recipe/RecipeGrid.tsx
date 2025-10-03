import RecipeCard from "./RecipeCard";

type Recipe = {
  id: string;
  title: string;
  image: string;
};

export default function RecipeGrid({ recipes }: { recipes: Recipe[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          id={recipe.id}
          title={recipe.title}
          image={recipe.image}
        />
      ))}
    </div>
  );
}
