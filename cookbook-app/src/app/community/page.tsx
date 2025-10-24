/*
*
*
*
*
*
* */
"use client";
import React, { useState } from "react";
// import {Recipe, theNullRecipe} from "@/types/recipe";
import {number, string, uuidv4} from "zod";
import {signOut, useSession} from "next-auth/react";



interface recipeDummy{
    userID:number;
    title: string;
    image: File | null;
    description: string;
    steps: string[];

}

export default function CommunityPage({ params }: { params: { id: string }; }) {
    const { data: session, status } = useSession()

    const [recipe, setRecipe] = useState<recipeDummy>({
        userID: 0,
        title: "",
        image: null,
        description: "",
        steps: [""],
    });

    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setRecipe({ ...recipe, [name]: value });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setRecipe({...recipe, ["image"]: file})
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleStepChange = (index: number, value: string) => {
        const updatedSteps = [...recipe.steps];
        updatedSteps[index] = value;
        setRecipe({ ...recipe, steps: updatedSteps });
    };

    const addStep = () => {
        setRecipe({ ...recipe, steps: [...recipe.steps, ""] });
    };

    const removeStep = (index: number) => {
        const updatedSteps = recipe.steps.filter((_, i) => i !== index);
        setRecipe({ ...recipe, steps: updatedSteps });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        console.log(recipe);
        alert("recipe Posted")

        const formData = new FormData();
        formData.append("email", session?session.user.email:"THE_UNMAILED_ONE" )
        formData.append("user", session?session.user.email:"THE_UNNAMED_ONE")
        formData.append("title", recipe.title);
        formData.append("description", recipe.description);
        console.log(recipe.steps);
        formData.append("steps", JSON.stringify(recipe.steps));
        if (recipe.image) {
            formData.append("image", recipe.image);
        }

        console.log(formData)

        try {
            const response = await fetch("http://localhost:8000/api/posts/", {
                method: "POST",
                body: formData,
            });
            const data = await response.json();
            alert(`Congrats \n recipe Posted: ${data.title}`);
            console.log("Recipe submitted:", data);
        } catch (error) {
            console.error("Error submitting recipe:", error);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-md mt-10">
            <h1 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">
                Create a Recipe
            </h1>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-200">
                        Title
                    </label>
                    <input
                        type="text"
                        name="title"
                        className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                        placeholder="Recipe title"
                        required
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-200">
                        Upload Image
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full text-gray-900 dark:text-gray-100"
                    />

                    {imagePreview && (
                        <div className="mt-3">
                            <p className="text-gray-600 dark:text-gray-300 mb-1">Preview:</p>
                            <img
                                src={imagePreview}
                                alt="Recipe preview"
                                className="w-48 h-48 object-cover rounded-xl border border-gray-300 dark:border-gray-700"
                            />
                        </div>
                    )}
                </div>

                <div>
                    <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-200">
                        Description
                    </label>
                    <textarea
                        name="description"
                        className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                        placeholder="Short description"
                        rows={3}
                        required
                        onChange={handleChange}
                    />
                </div>

                {/* Steps */}
                <div>
                    <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-200">
                        Steps
                    </label>
                    {recipe.steps.map((step, index) => (
                        <div key={index} className="flex items-center gap-2 mb-2">
                            <input
                                type="text"
                                value={step}
                                className="flex-1 border border-gray-300 dark:border-gray-700 rounded-lg p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                                placeholder={`Step ${index + 1}`}
                                onChange={(e) => handleStepChange(index, e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className="text-red-500 hover:text-red-700 dark:hover:text-red-400 font-bold"
                                onClick={() => removeStep(index)}
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        className="mt-1 text-blue-600 hover:text-blue-800 dark:hover:text-blue-400 font-semibold"
                        onClick={addStep}
                    >
                        + Add Step
                    </button>
                </div>

                <div className="text-center">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white rounded-lg transition"
                    >
                        Submit Recipe
                    </button>
                </div>
            </form>
        </div>

    );
}
// export default function communityPage() {
//
//     const [recipe,setRecipe] = useState(theNullRecipe);
//
//     // Event handler for input changes
//     const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
//         // setName(event.target.value);
//         // setRecipe({})
//     };
//
//     // Event handler for form submission
//     const handleSubmit = (event: { preventDefault: () => void; }) => {
//         event.preventDefault(); // Prevent default browser form submission
//         alert(`A name was submitted: ${name}`);
//         // You would typically send this data to a server or perform other actions here
//         setRecipe(theNullRecipe); // Clear the input after submission
//     };
//
//     return (
//         <form onSubmit={handleSubmit}>
//             <label>
//                 Enter your Food Name:
//                 <input
//                     type="title"
//                     value={title} // The value of the input is controlled by the 'name' state
//                     onChange={handleChange} // Update the 'name' state on every change
//                 />
//             </label>
//
//             <label>
//                 Enter your Food description:
//                 <input
//                     type="description"
//                     value={title} // The value of the input is controlled by the 'name' state
//                     onChange={handleChange} // Update the 'name' state on every change
//                 />
//             </label>
//
//
//             <button type="submit">Submit</button>
//         </form>
//     );
// }

