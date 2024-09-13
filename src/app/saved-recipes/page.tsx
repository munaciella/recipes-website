/* eslint-disable @next/next/no-img-element */
'use client';
import { NextPage } from 'next';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { useSupabaseAuth } from '@/context/AuthContext';
import { Recipe } from '@/types/recipe';
import { RecipeDetailSkeleton } from '@/components/ui/SkeletonCard';

const SavedRecipesPage: NextPage = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const { session, userDetails } = useSupabaseAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      if (!session || !userDetails?.user_id) return;

      setLoading(true);

      try {
        const { data, error } = await supabase
          .from('saved_recipes')
          .select('recipe_id, recipes(*)')
          .eq('user_id', userDetails.user_id);

        if (error) {
          console.error('Error fetching saved recipes:', error);
        } else {
          setRecipes(data.map((item: any) => item.recipes));
        }
      } catch (error) {
        console.error('Unexpected error fetching saved recipes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedRecipes();
  }, [session, userDetails]);

  return (
    <section className="flex flex-col p-4 mt-16 md:mt-20">
      <h1 className="text-4xl font-bold mb-6 text-center">Saved Recipes</h1>

      {loading ? (
        <RecipeDetailSkeleton />
      ) : recipes.length > 0 ? (
        recipes.map((recipe) => (
          <div
            key={recipe.recipe_id}
            className="w-full max-w-2xl border dark:border-slate-600 rounded-lg overflow-hidden shadow-lg p-4 mt-4 cursor-pointer"
            onClick={() => router.push(`/recipe/${recipe.recipe_id}`)}
          >
            <div className="w-full h-full relative">
              <img
                src={recipe.image_url}
                alt={recipe.title}
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>
            <div className="flex flex-col p-4 text-center -mb-3">
              <h1 className="text-2xl font-bold mb-2">{recipe.title}</h1>
              <p className="text-lg mb-2">
                <span className="font-semibold">Category:</span>{' '}
                {recipe.category}
              </p>
              <p className="text-lg mb-2">
                <span className="font-semibold">Cooking Time:</span>{' '}
                {recipe.cooking_time}
              </p>
              <p className="text-lg -mb-2">
                <span className="font-semibold">Difficulty:</span>{' '}
                {recipe.difficulty}
              </p>
              <p className="text-lg -mb-2 mt-4">
                <span className="font-semibold">Allergy Advice:</span>{' '}
                {recipe.allergy_advice}
                </p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center">You have no saved recipes yet.</p>
      )}
    </section>
  );
};

export default SavedRecipesPage;
