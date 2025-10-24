export interface Recipe {
    id: string;
    title: string;
    image: string;
    description: string;
    steps: string[];
}

/* used for a we dont have this recipe option*/
export const theNullRecipe: Recipe =
    {
        id: "0",
        title: "THE NULL RECIPE",
        image: "/assets/noFood.jpg",
        description: "NO FOOD WAS FOUND WITH THIS ID\n",
        steps: [
            "Go To Restaurant",
            "Buy Food",
            "EAT",
            "cry that you spent money",
            "go home"
        ]
    };

export async function getRecipe(id: string): Promise<Recipe> {
    try {
        const res = await fetch(`http://localhost:8000/recipes/${id}.json`)

        if (!res.ok) return theNullRecipe;

        return await res.json(); // JSON automatically converted to JS object
    } catch (error) {

        return theNullRecipe;
    }
    /* I imagine this would change out to localhost:8000 to get json from our SQL Django DB, this is here to make it easier for later hopefully */
}