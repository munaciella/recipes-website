/* eslint-disable @next/next/no-img-element */
'use client';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { SkeletonCard } from '@/components/ui/SkeletonCard';
import { Button } from '@/components/ui/button';
import { useSupabaseAuth } from '@/context/AuthContext';
import { Recipe } from '@/types/recipe';
import NotFound from 'next/error';

const RecipesPage: NextPage = () => {
  const [data, setData] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { session, userDetails } = useSupabaseAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data: myData, error } = await supabase
        .from('recipes')
        .select('*');
      if (error) {
        console.error('Error fetching recipes:', error);
        setError('Failed to fetch data. Please try again later.');
      } else {
        setData(myData as Recipe[]);
        setError(null);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleRecipeClick = (recipe_id: string) => {
    router.push(`/recipe/${recipe_id}`);
  };

  if (!loading && error) {
    return <NotFound statusCode={404} />;
  }

  return (
    <section className="flex flex-col items-center p-4 mt-12">
      <div className="w-full max-w-8xl flex justify-center md:justify-end lg:justify-end xl:justify-end mb-8">
        {session && userDetails?.role && (
          userDetails.role === 'business' ? (
            <Button>Add a Recipe</Button>
          ) : (
            <Button>Suggest a Recipe</Button>
          )
        )}
      </div>

      <h1 className="text-4xl font-bold text-center mb-6">
        Browse Our Delicious Recipes
      </h1>

      {loading && (
        <div className="grid grid-cols-1 justify-items-center m-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-16 mt-14">
          {Array.from({ length: 6 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      )}


      <div className="grid grid-cols-1 justify-items-center m-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-14 mt-10">
        {!loading &&
          !error &&
          data.map((item) => (
            <div
              key={item.recipe_id}
              className="w-full rounded-lg overflow-hidden shadow-lg mt-8 p-2 cursor-pointer border dark:bg-background hover:bg-gray-100 dark:hover:bg-gray-800 transition duration-200"
              onClick={() => handleRecipeClick(item.recipe_id.toString())}
            >
              <img
                src={item.image_url}
                alt={item.title}
                className="w-full h-96 object-cover rounded-lg"
              />
              <div className="flex flex-col items-center p-4">
                <h2 className="text-2xl font-semibold mb-2">{item.title}</h2>
                <p className="text-lg mb-2">
                  <span className="font-semibold">Category:</span>{' '}
                  {item.category}
                </p>

                <p className="text-md mb-2">
                  <span className="font-semibold">Cooking Time:</span>{' '}
                  {item.cooking_time}
                </p>

                <p className="text-md mb-2">
                  <span className="font-semibold">Difficulty:</span>{' '}
                  {item.difficulty}
                </p>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default RecipesPage;
