import React from "react";
import { NextPage } from "next/types";
import { copy } from "@/copy";

const { description } = copy.recipesPage;

const RecipesPage: NextPage = () => {
  return (
    <section className="flex flex-col items-center">
      <span className="text-2xl mt-20 text-primary-400 font-semibold">
        {description.heading.top}
      </span>
      <span className="text-center text-xl mt-8 text-primary-400">
        {description.heading.bottom}
      </span>

      <div className="grid grid-cols-1 justify-items-center m-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-20 mt-10">
        {description.recipes.map(({ image, title }, idx) => (
          <div key={idx} className="w-full">
            <div className="w-full rounded-lg overflow-hidden shadow-lg">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="block text-primary-500 mt-4">{title}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecipesPage;