"use client";
import React, { useState } from "react";
import {useSession} from "next-auth/react";

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

        if (!session) {
            // form.reset();
            return alert("You must be logged in to post a recipe");
        }

        console.log(recipe);
        alert("recipe Posted")

        const formData = new FormData();

        formData.append("title", recipe.title);
        formData.append("body", recipe.description);
        formData.append("ingredients", JSON.stringify(["Chicken", "Spice"]));
        formData.append("instructions", JSON.stringify(recipe.steps));
        formData.append("username", session.user.username);

        if (recipe.image) {
            formData.append("images", recipe.image);
        }

        console.log(formData)

        try {

            const response = await fetch("http://localhost:8000/api/posts/", {
                method: "POST",
                body: formData
            });
            const data = await response.json();
            // form.clear();
            
	 		if (response.ok) {
				alert("Recipe Submitted: " + data.title);

	 		} else {
	 			const errorMessages = Object.entries(data)
            		.map(([field, messages]) => `${field}: ${(messages as string[]).join(", ")}`)
            		.join("\n");

        		alert(`Failed to submit:\n${errorMessages}`);
        		throw new Error(errorMessages); 
	 		}
            
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
