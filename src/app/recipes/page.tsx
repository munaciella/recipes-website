/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import { NextPage } from "next/types";
import { SkeletonCard } from "@/components/ui/SkeletonCard";

interface Recipe {
  _id: string;
  title: string;
  image: { src: string; alt: string };
  ingredients: string[];
  instructions: string[];
  cookingTime: string;
}

const RecipesPage: NextPage = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <h1 className="text-3xl font-bold mb-8">Recipes</h1>
      </div>
  )
};

export default RecipesPage;