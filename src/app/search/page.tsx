/* eslint-disable @next/next/no-img-element */
'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { SkeletonCard } from '@/components/ui/SkeletonCard';
import { Recipe } from '@/types';

const SearchResults = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchResults, setSearchResults] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const results = searchParams.get('results');
    console.log('Results params:', results);

    if (results) {
      try {
        const parsedResults = JSON.parse(results);
        console.log('Parsed results:', parsedResults);

        if (Array.isArray(parsedResults) && parsedResults.length > 0) {
          setSearchResults(parsedResults);
        } else {
          setError('No recipes found');
        }
      } catch (e) {
        setError('Failed to parse search results');
        console.error('Parsing error:', e);
      }
    } else {
      setError('No results parameter in query');
    }

    setLoading(false);
  }, [searchParams]);

  const handleRecipeClick = (recipe_id: number) => {
    router.push(`/recipe/${recipe_id}`);
  };

  return (
    <section className="flex flex-col items-center p-4 max-w-3xl mx-auto mt-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 mt-4 text-center">Search Results
      </h1>

      {loading && <SkeletonCard />}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <ul className="w-full space-y-4">
          {searchResults.map((recipe) => (
            <li
              key={recipe.recipe_id}
              className="cursor-pointer"
              onClick={() => handleRecipeClick(recipe.recipe_id)}
            >
              <div className="w-full max-w-2xl border dark:border-slate-600 rounded-lg overflow-hidden shadow-lg p-4 mt-4 transition hover:bg-gray-50 dark:hover:bg-gray-800">
                <div className="relative w-full h-full">
                  <img
                    src={recipe.image_url}
                    alt={recipe.title}
                    className="w-full h-96 object-cover rounded-lg"
                  />
                </div>
                <div className="p-4">
                  <h1 className="text-2xl font-bold mb-2">{recipe.title}</h1>
                  <p className="text-lg mb-2">
                    <span className="font-semibold">Category:</span>{' '}
                    {recipe.category}
                  </p>
                  <p className="text-lg mb-2">
                    <span className="font-semibold">Ingredients:</span>{' '}
                    {recipe.ingredients}
                  </p>
                  <p className="text-md mb-2">
                    <span className="font-semibold">Cooking Time:</span>{' '}
                    {recipe.cooking_time}
                  </p>
                  <p className="text-md -mb-2">
                    <span className="font-semibold">Difficulty:</span>{' '}
                    {recipe.difficulty}
                  </p>
                </div>
              </div>
            </li>
          ))}{' '}
        </ul>
      )}
    </section>
  );
};

export default SearchResults;
