"use client";

import { ModeToggle } from "@/components/theme/ModeToggle"

import Navbar from "@/components/ui/navbar";
import RecipeGrid from "@/components/recipe/RecipeGrid";
import SearchBar from "@/components/ui/SearchBar";
import { useState } from "react";

export default function Home() { 
  //hard coding for now
  const recipes = [
    { id: "1", title: "Homemade Pizza", image: "/assets/homemade_pizza.jpg" },
    { id: "2", title: "Hot Chocolate", image: "/assets/hotchocolate.jpg" },
    { id: "3", title: "Classic House Salad", image: "/assets/house-salad.jpeg" },
    { id: "4", title: "Pakistani Seekh Kebab", image: "/assets/kebab.jpg" },
    { id: "5", title: "Homemade Lemonade", image: "/assets/lemonade.jpg" },
    { id: "6", title: "Steak", image: "/assets/steak.jpg" },
    { id: "7", title: "Korean Instant Ramen Trick", image: "/assets/ramen.jpg" },
    { id: "8", title: "Ultimate Chicken Soup", image: "/assets/chicken_soup.jpg" },
    { id: "9", title: "Chicken Fried Rice", image: "/assets/chicken-fried-rice.jpg" },
    { id: "10", title: "Chicago Style Hot Dog", image: "/assets/chicago_hot_dog.jpg" },
  ];

  const [searchQuery, setSearchQuery] = useState("");

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
    <div className="flex flex-col gap-5 w-full h-full items-center">

      <Navbar />

      <ModeToggle />

      <div>This is the home page</div>
      <a className="border-1 w-fit px-3 py-2 rounded-xl" href="/">Home</a>
      <a className="border-1 w-fit px-3 py-2 rounded-xl" href="/sign-in">Sign in</a>
      <a className="border-1 w-fit px-3 py-2 rounded-xl" href="/sign-up">Sign up</a>

    

      {/* Recipie Gallary/Grid with search*/}
      <div className="p-6">
        <h1 className="text-center text-2xl font-bold mb-6">Recipe Gallery</h1>

        <div className="flex justify-center mb-6">
          <SearchBar onSearch={(q) => setSearchQuery(q)} />
        </div> 
        
        <RecipeGrid recipes={filteredRecipes} />
      </div>


      {/* About Paragraph */}
      <div className = "m-10 p-5">
        <h1 className="text-center font-bold text-xl">About</h1>
        <p className="text-center text-gray-150">
          <br></br>
          Have you ever realized that you are tired of eating out
          but don't really know what to do with the ingredients you already have?
          <br></br><br></br>
          Do you "have food at home" that you don't know how to cook or takes to
          long to cook so you end up eating out anyway?
          <br></br><br></br>
          We are Team Crunchy Tornado,
          and this webapp was developed as part of a UIC CS442 project to solve
          exactly this problem. Here on Team Crunchy Tornado, we are about that big
          back food life, and can teach you to be as well.
          <br></br><br></br>
          Our application lets
          users browse and discover meals to fit ingredients you already have. It is
          a fun and interactive way to save money, and learn how to cook new meals at
          the same time.
          <br></br><br></br>
        </p>

        {/*
            sideways Image bar
            would be responsive to screen size and stack if I was goated
        */}
        <div className="flex flex-wrap gap-2">
          <div className="flex-1 aspect-square">
            <img
              src = "/assets/beefyboi.jpg"
              alt="Image 1"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 aspect-square">
            <img
              src = "/assets/charcuterieBoard.jpg"
              alt="Image 2"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

      </div>





    </div>
  );
}

