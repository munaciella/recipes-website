/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";
import { NextPage } from "next/types";
import { SkeletonCard } from "@/components/ui/SkeletonCard";
import { Button } from "@/components/ui/button";
import { useSupabaseAuth } from "@/context/AuthContext";

interface Recipe {
  _id: string;
  title: string;
  image: { src: string; alt: string };
  ingredients: string[];
  instructions: string[];
  cookingTime: string;
}

const RecipesPage: NextPage = () => {
  const { userDetails, session, loading } = useSupabaseAuth();

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loadingRecipes, setLoadingRecipes] = useState(true);

  useEffect(() => {
    // Placeholder for fetching recipes logic
    setTimeout(() => {
      setLoadingRecipes(false);
      setRecipes([
        {
          _id: "1",
          title: "Vegan Pancakes",
          image: { src: "/images/pancakes.jpg", alt: "Vegan Pancakes" },
          ingredients: ["Flour", "Almond milk", "Baking powder", "Maple syrup"],
          instructions: ["Mix ingredients", "Cook on skillet", "Serve hot"],
          cookingTime: "20 mins",
        },
      ]);
    }, 2000);
  }, []);

  if (loading) {
    return <SkeletonCard />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <h1 className="text-3xl font-bold mb-8">Recipes</h1>

      {loadingRecipes ? (
        <SkeletonCard />
      ) : (
        <>
          {session && userDetails.role && (
            userDetails.role === "business" ? (
              <Button className="self-end mb-4">Add a Recipe</Button>
            ) : (
              <Button className="self-end mb-4">Suggest a Recipe</Button>
            )
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <div key={recipe._id} className="bg-card dark:bg-card p-4 rounded-lg shadow-lg">
                <img
                  src={recipe.image.src}
                  alt={recipe.image.alt}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <h2 className="text-xl font-bold mb-2">{recipe.title}</h2>
                  <p className="text-sm text-muted">Cooking Time: {recipe.cookingTime}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default RecipesPage;