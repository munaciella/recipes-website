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
import { FaThumbsUp, FaThumbsDown, FaRegComment } from 'react-icons/fa';
import { toast } from '@/components/ui/use-toast';

const RecipesPage: NextPage = () => {
  const [data, setData] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userVotes, setUserVotes] = useState<Map<number, string>>(new Map());
  const [votesCount, setVotesCount] = useState<Map<number, { upvotes: number, downvotes: number }>>(new Map());
  const [commentsCount, setCommentsCount] = useState<Map<number, number>>(new Map());
  const { session, userDetails } = useSupabaseAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data: recipes, error } = await supabase
        .from('recipes')
        .select('*');
      
      if (error) {
        console.error('Error fetching recipes:', error);
        setError('Failed to fetch data. Please try again later.');
      } else {
        setData(recipes as Recipe[]);
        setError(null);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchUserVotes = async () => {
      if (session) {
        const { data: votes, error } = await supabase
          .from('votes')
          .select('recipe_id, vote_type')
          .eq('user_id', userDetails?.user_id);
        
        if (error) {
          console.error('Error fetching user votes:', error);
        } else {
          const votesMap = new Map<number, string>();
          votes?.forEach(vote => votesMap.set(vote.recipe_id, vote.vote_type));
          setUserVotes(votesMap);
        }
      }
    };

    fetchUserVotes();
  }, [session, userDetails]);

  useEffect(() => {
    const fetchVotesCount = async () => {
      const { data: votes, error } = await supabase
        .from('votes')
        .select('recipe_id, vote_type');
      
      if (error) {
        console.error('Error fetching votes count:', error);
      } else {
        const countMap = new Map<number, { upvotes: number, downvotes: number }>();
        votes?.forEach(vote => {
          const currentCount = countMap.get(vote.recipe_id) || { upvotes: 0, downvotes: 0 };
          if (vote.vote_type === 'upvote') {
            currentCount.upvotes += 1;
          } else if (vote.vote_type === 'downvote') {
            currentCount.downvotes += 1;
          }
          countMap.set(vote.recipe_id, currentCount);
        });
        setVotesCount(countMap);
      }
    };

    const fetchCommentsCount = async () => {
      const { data: comments, error } = await supabase
        .from('comments')
        .select('recipe_id');
      
      if (error) {
        console.error('Error fetching comments count:', error);
      } else {
        const countMap = new Map<number, number>();
        comments?.forEach(comment => {
          const currentCount = countMap.get(comment.recipe_id) || 0;
          countMap.set(comment.recipe_id, currentCount + 1);
        });
        setCommentsCount(countMap);
      }
    };

    fetchVotesCount();
    fetchCommentsCount();
  }, []);

  const handleVote = async (recipe_id: number, vote_type: 'upvote' | 'downvote') => {
    if (!session) {
      toast.error('You need to be logged in to vote.');
      return;
    }
  
    const existingVote = userVotes.get(recipe_id);
  
    if (existingVote === vote_type) {
      toast.error('You have already voted this way on this recipe.');
      return;
    }
  
    try {
      if (existingVote) {
        await supabase
          .from('votes')
          .delete()
          .match({ user_id: userDetails?.user_id, recipe_id });
      }
  
      await supabase
        .from('votes')
        .upsert([{ user_id: userDetails?.user_id, recipe_id, vote_type }]);
  
      const newUserVotes = new Map(userVotes);
      newUserVotes.set(recipe_id, vote_type);
      setUserVotes(newUserVotes);
  
      const newVotesCount = new Map(votesCount);
      const currentCount = newVotesCount.get(recipe_id) || { upvotes: 0, downvotes: 0 };
  
      if (existingVote === 'upvote') {
        currentCount.upvotes -= 1;
      } else if (existingVote === 'downvote') {
        currentCount.downvotes -= 1;
      }
  
      if (vote_type === 'upvote') {
        currentCount.upvotes += 1;
      } else if (vote_type === 'downvote') {
        currentCount.downvotes += 1;
      }
  
      newVotesCount.set(recipe_id, currentCount);
      setVotesCount(newVotesCount);
  
      toast.success(`Successfully ${vote_type === 'upvote' ? 'upvoted' : 'downvoted'} the recipe.`);
    } catch (error) {
      console.error('Error handling vote:', error);
      toast.error('An error occurred while voting.');
    }
  };

  const handleRecipeClick = (recipe_id: number) => {
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 justify-items-center m-6 gap-14 mt-10 w-full max-w-8xl">
        {!loading &&
          !error &&
          data.map((item) => (
            <div
              key={item.recipe_id}
              className="w-full flex flex-col items-center"
            >
              <div
                className="w-full max-w-xs md:max-w-sm lg:max-w-xs xl:max-w-sm rounded-lg overflow-hidden shadow-lg p-2 mt-2 cursor-pointer border dark:border-slate-600 dark:bg-background hover:bg-gray-100 dark:hover:bg-gray-800 transition duration-100"
                onClick={() => handleRecipeClick(item.recipe_id)}
              >
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="w-full h-96 object-cover rounded-lg"
                />
                <div className="flex flex-col items-center p-4">
                  <h2 className="text-2xl font-semibold mb-2 text-center">
                    {item.title}
                  </h2>
                  <p className="text-lg mb-2 text-center">
                    <span className="font-semibold">Category:</span>{' '}
                    {item.category}
                  </p>
                  <p className="text-md mb-2 text-center">
                    <span className="font-semibold">Cooking Time:</span>{' '}
                    {item.cooking_time}
                  </p>
                  <p className="text-md mb-2 text-center">
                    <span className="font-semibold">Difficulty:</span>{' '}
                    {item.difficulty}
                  </p>
                </div>
              </div>

              <div className="flex justify-center gap-4 p-0 mt-4">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleVote(item.recipe_id, 'upvote')}
                    className={`text-xl ${userVotes.get(item.recipe_id) === 'upvote' ? 'text-green-500' : 'text-slate-600 dark:text-slate-500'}`}
                    aria-label="Upvote"
                  >
                    <FaThumbsUp />
                  </button>
                  <span>{votesCount.get(item.recipe_id)?.upvotes || 0}</span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleVote(item.recipe_id, 'downvote')}
                    className={`text-xl ${userVotes.get(item.recipe_id) === 'downvote' ? 'text-red-500' : 'text-slate-600 dark:text-slate-500'}`}
                    aria-label="Downvote"
                  >
                    <FaThumbsDown />
                  </button>
                  <span>{votesCount.get(item.recipe_id)?.downvotes || 0}</span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleRecipeClick(item.recipe_id)}
                    className="text-xl text-slate-600 dark:text-slate-500"
                    aria-label="Comment"
                  >
                    <FaRegComment />
                  </button>
                  <span>{commentsCount.get(item.recipe_id) || 0}</span>
                </div>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default RecipesPage;

