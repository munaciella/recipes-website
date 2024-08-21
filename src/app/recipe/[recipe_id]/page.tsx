/* eslint-disable @next/next/no-img-element */
'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Recipe } from '@/types/recipe';
//import { SkeletonCard } from '@/components/ui/SkeletonCard';
import NotFound from 'next/error';
import { NextPage } from 'next';
import { RecipeDetailSkeleton } from '@/components/ui/SkeletonCard';

const RecipeDetailPage: NextPage = () => {
  const { recipe_id } = useParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      if (!recipe_id) return;

      setLoading(true);
      const { data, error } = await supabase
        .from('recipes')
        .select('*')
        .eq('recipe_id', recipe_id)
        .single();

      if (error) {
        console.error('Error fetching recipe:', error);
        setError('Failed to fetch recipe. Please try again later.');
      } else {
        setRecipe(data as Recipe);
        setError(null);
      }
      setLoading(false);
    };

    fetchRecipe();
  }, [recipe_id]);

  //if (error || !recipe) return <NotFound statusCode={404} />;

  return (
    <section className="flex flex-col items-center p-4 mt-20">
      <h1 className="text-3xl font-bold text-center mb-6">Recipe Details</h1>

      {loading ? (
        <RecipeDetailSkeleton />
      ) : error || !recipe ? (
        <NotFound statusCode={404} />
      ) : (
        <div className="w-full max-w-2xl border dark:border-slate-600 rounded-lg overflow-hidden shadow-lg p-4 mt-3">
          <div className="w-full h-full relative">
            <img
              src={recipe.image_url}
              alt={recipe.title}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>
          <div className="flex flex-col p-4">
            <h1 className="text-2xl font-bold mb-4">{recipe.title}</h1>
            <p className="text-lg mb-2">
              <span className="font-semibold">Category:</span> {recipe.category}
            </p>

            <p className="text-md mb-2">
              <span className="font-semibold">Cooking Time:</span>{' '}
              {recipe.cooking_time}
            </p>

            <p className="text-md mb-2">
              <span className="font-semibold">Difficulty:</span>{' '}
              {recipe.difficulty}
            </p>

            <p className="text-md mb-2">
              <span className="font-semibold">Ingredients:</span>{' '}
              {recipe.ingredients}
            </p>

            <p className="text-md mb-2">
              <span className="font-semibold">Instructions:</span>{' '}
              {recipe.instructions}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default RecipeDetailPage;
