/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import { NextPage } from "next/types";
import { copy } from "@/copy";

const { recipesDescription } = copy.recipesPage;

interface Recipe {
  title: string;
  image: { src: string; alt: string };
  ingredients: string[];
  instructions: string[];
  cookingTime: string;
}

const RecipesPage: NextPage = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  return (
    <section className="flex flex-col items-center">
      <h1 className="text-2xl mt-20 text-primary-400 font-semibold">
        {recipesDescription.heading.top}
      </h1>
      <span className="text-center text-xl mt-8 text-primary-400">
        {recipesDescription.heading.bottom}
      </span>

      <div className="grid grid-cols-1 justify-items-center m-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-20 mt-20">
        {recipesDescription.recipes.map(({ image, title }, idx) => (
          <div key={idx} className="w-full">
            <div className="w-full rounded-lg overflow-hidden shadow-lg">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="block text-primary-500 mt-4 mb-2">{title}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecipesPage;
