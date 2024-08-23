// /* eslint-disable @next/next/no-img-element */
// 'use client';
// import { useParams } from 'next/navigation';
// import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
// import { supabase } from '@/lib/supabaseClient';
// import { Recipe } from '@/types/recipe';
// import NotFound from 'next/error';
// import { NextPage } from 'next';
// import { RecipeDetailSkeleton } from '@/components/ui/SkeletonCard';
// import { FaThumbsUp, FaThumbsDown, FaTrash } from 'react-icons/fa';
// import { useSupabaseAuth } from '@/context/AuthContext';
// import { toast } from '@/components/ui/use-toast';
// import { Textarea } from '@/components/ui/textarea';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';

// const RecipeDetailPage: NextPage = () => {
//   const { recipe_id } = useParams();
//   const [recipe, setRecipe] = useState<Recipe | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [userVote, setUserVote] = useState<string | null>(null);
//   const [comments, setComments] = useState<
//     { id: number; comment: string; user_id: number; nickname: string }[]
//   >([]);
//   const [newComment, setNewComment] = useState<string>('');
//   const [nickname, setNickname] = useState<string>('');
//   const { session, userDetails } = useSupabaseAuth();

//   useEffect(() => {
//     const fetchRecipe = async () => {
//       if (!recipe_id) return;

//       setLoading(true);
//       const { data, error } = await supabase
//         .from('recipes')
//         .select('*')
//         .eq('recipe_id', recipe_id)
//         .single();

//       if (error) {
//         console.error('Error fetching recipe:', error);
//         setError('Failed to fetch recipe. Please try again later.');
//       } else {
//         setRecipe(data as Recipe);
//         setError(null);
//       }
//       setLoading(false);
//     };

//     const fetchComments = async () => {
//       if (!recipe_id) return;

//       const { data, error } = await supabase
//         .from('comments')
//         .select('id, comment, user_id, nickname')
//         .eq('recipe_id', recipe_id)
//         .order('created_at', { ascending: false });

//       if (error) {
//         console.error('Error fetching comments:', error);
//       } else {
//         setComments(data);
//       }
//     };

//     const fetchUserVote = async () => {
//       if (session && userDetails?.user_id) {
//         const { data, error } = await supabase
//           .from('votes')
//           .select('vote_type')
//           .eq('user_id', userDetails.user_id)
//           .eq('recipe_id', recipe_id)
//           .single();

//         if (error && error.code !== 'PGRST116') {
//           console.error('Error fetching user vote:', error);
//         } else {
//           setUserVote(data?.vote_type || null);
//         }
//       }
//     };

//     fetchRecipe();
//     fetchComments();
//     fetchUserVote();
//   }, [recipe_id, session, userDetails]);

//   const handleVote = async (voteType: 'upvote' | 'downvote') => {
//     if (!session) {
//       toast.error('You need to be logged in to vote.');
//       return;
//     }

//     try {
//       if (userVote === voteType) {
//         toast.error(`You have already ${voteType}d this recipe.`);
//         return;
//       }

//       if (userVote) {
//         await supabase
//           .from('votes')
//           .delete()
//           .match({ user_id: userDetails?.user_id, recipe_id });
//       }

//       await supabase
//         .from('votes')
//         .upsert([{ user_id: userDetails?.user_id, recipe_id, vote_type: voteType }]);

//       setUserVote(voteType);
//       toast.success(`Successfully ${voteType}d the recipe.`);
//     } catch (error) {
//       console.error('Error handling vote:', error);
//       toast.error('An error occurred while voting.');
//     }
//   };

//   const handleCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
//     setNewComment(e.target.value);
//   };

//   const handleNicknameChange = (e: ChangeEvent<HTMLInputElement>) => {
//     setNickname(e.target.value);
//   };

//   const handleCommentSubmit = async (e: FormEvent) => {
//     e.preventDefault();

//     if (!session) {
//       toast.error('You need to be logged in to comment.');
//       return;
//     }

//     if (!userDetails?.user_id) {
//       toast.error('User details are not available.');
//       return;
//     }

//     try {
//       const { data, error } = await supabase
//         .from('comments')
//         .insert([
//           {
//             recipe_id: recipe_id,
//             user_id: userDetails.user_id,
//             comment: newComment,
//             nickname: nickname || 'Anonymous',
//           },
//         ])
//         .select();

//       if (error) throw error;

//       const newCommentId = data[0]?.id;

//       setNewComment('');
//       setNickname('');
//       setComments([
//         {
//           id: newCommentId,
//           comment: newComment,
//           user_id: userDetails.user_id,
//           nickname: nickname || 'Anonymous',
//         },
//         ...comments,
//       ]);
//       toast.success('Comment added successfully.');
//     } catch (error) {
//       console.error('Error adding comment:', error);
//       toast.error('An error occurred while adding the comment.');
//     }
//   };

//   const handleDeleteComment = async (commentId: number) => {
//     if (!session) {
//       toast.error('You need to be logged in to delete a comment.');
//       return;
//     }

//     try {
//       const { error } = await supabase
//         .from('comments')
//         .delete()
//         .match({ id: commentId, user_id: userDetails?.user_id });

//       if (error) throw error;

//       setComments(comments.filter((comment) => comment.id !== commentId));
//       toast.success('Comment deleted successfully.');
//     } catch (error) {
//       console.error('Error deleting comment:', error);
//       toast.error('An error occurred while deleting the comment.');
//     }
//   };

//   if (error && !recipe) return <NotFound statusCode={404} />;

//   return (
//     <section className="flex flex-col items-center p-4 mt-20">
//       <h1 className="text-3xl font-bold text-center mb-6">Recipe Details</h1>

//       {loading ? (
//         <RecipeDetailSkeleton />
//       ) : recipe ? (
//         <div className="w-full max-w-2xl border dark:border-slate-600 rounded-lg overflow-hidden shadow-lg p-4 mt-6">
//           <div className="w-full h-full relative">
//             <img
//               src={recipe.image_url}
//               alt={recipe.title}
//               className="w-full h-96 object-cover rounded-lg"
//             />
//           </div>
//           <div className="flex flex-col p-4">
//             <h1 className="text-2xl font-bold mb-4">{recipe.title}</h1>
//             <p className="text-lg mb-2">
//               <span className="font-semibold">Category:</span> {recipe.category}
//             </p>

//             <p className="text-md mb-2">
//               <span className="font-semibold">Cooking Time:</span>{' '}
//               {recipe.cooking_time}
//             </p>

//             <p className="text-md mb-2">
//               <span className="font-semibold">Difficulty:</span> {recipe.difficulty}
//             </p>

//             <p className="text-md mb-2">
//               <span className="font-semibold">Ingredients:</span> {recipe.ingredients}
//             </p>

//             <p className="text-md mb-2">
//               <span className="font-semibold">Instructions:</span> {recipe.instructions}
//             </p>

//             <div className="flex gap-4 mt-4">
//               {session && (
//                 <>
//                   <button
//                     onClick={() => handleVote('upvote')}
//                     className={`text-2xl ${
//                       userVote === 'upvote' ? 'text-green-500' : 'text-gray-500'
//                     }`}
//                     aria-label="Upvote"
//                   >
//                     <FaThumbsUp />
//                   </button>
//                   <button
//                     onClick={() => handleVote('downvote')}
//                     className={`text-2xl ${
//                       userVote === 'downvote' ? 'text-red-500' : 'text-gray-500'
//                     }`}
//                     aria-label="Downvote"
//                   >
//                     <FaThumbsDown />
//                   </button>
//                 </>
//               )}
//             </div>

//             {session && (
//               <form onSubmit={handleCommentSubmit} className="mt-6">
//                 <Input
//                   value={nickname}
//                   onChange={handleNicknameChange}
//                   placeholder="Your nickname (optional)"
//                   className="w-full p-2 border rounded-lg mb-2"
//                 />
//                 <Textarea
//                   value={newComment}
//                   onChange={handleCommentChange}
//                   placeholder="Add a comment"
//                   rows={3}
//                   className="w-full p-2 border rounded-lg"
//                 />
//                 <Button
//                   type="submit"
//                   className="mt-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
//                 >
//                   Add Comment
//                 </Button>
//               </form>
//             )}

//             <div className="mt-6">
//               <h2 className="text-xl font-semibold">Comments</h2>
//               {comments.length > 0 ? (
//                 comments.map((comment) => (
//                   <div
//                     key={comment.id}
//                     className="mt-4 p-2 border dark:border-slate-600 rounded-lg"
//                   >
//                     <div className="flex justify-between items-center">
//                       <p className="text-md font-semibold">
//                         {comment.nickname || 'Anonymous'}
//                       </p>
//                       {session && comment.user_id === userDetails?.user_id && (
//                         <button
//                           onClick={() => handleDeleteComment(comment.id)}
//                           className="text-red-500"
//                           aria-label="Delete"
//                         >
//                           <FaTrash />
//                         </button>
//                       )}
//                     </div>
//                     <p className="text-md mt-2">{comment.comment}</p>
//                   </div>
//                 ))
//               ) : (
//                 <p className="mt-4">No comments yet. Be the first to comment!</p>
//               )}
//             </div>
//           </div>
//         </div>
//       ) : (
//         <NotFound statusCode={404} />
//       )}
//     </section>
//   );
// };

// export default RecipeDetailPage;

/* eslint-disable @next/next/no-img-element */
'use client';
import * as React from 'react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { FaThumbsUp, FaThumbsDown, FaTrash } from 'react-icons/fa';
import { useParams } from 'next/navigation';
import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Recipe } from '@/types/recipe';
import NotFound from 'next/error';
import { NextPage } from 'next';
import { RecipeDetailSkeleton } from '@/components/ui/SkeletonCard';
import { useSupabaseAuth } from '@/context/AuthContext';
import { toast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const RecipeDetailPage: NextPage = () => {
  const { recipe_id } = useParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userVote, setUserVote] = useState<string | null>(null);
  const [comments, setComments] = useState<
    { id: number; comment: string; user_id: number; nickname: string | null }[]
  >([]);
  const [newComment, setNewComment] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const { session, userDetails } = useSupabaseAuth();

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

    const fetchComments = async () => {
      if (!recipe_id) return;

      const { data, error } = await supabase
        .from('comments')
        .select('id, comment, user_id, nickname')
        .eq('recipe_id', recipe_id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching comments:', error);
      } else {
        setComments(data);
      }
    };

    const fetchUserVote = async () => {
      if (session && userDetails?.user_id) {
        const { data, error } = await supabase
          .from('votes')
          .select('vote_type')
          .eq('user_id', userDetails.user_id)
          .eq('recipe_id', recipe_id)
          .single();

        if (error && error.code !== 'PGRST116') {
          console.error('Error fetching user vote:', error);
        } else {
          setUserVote(data?.vote_type || null);
        }
      }
    };

    fetchRecipe();
    fetchComments();
    fetchUserVote();
  }, [recipe_id, session, userDetails]);

  const handleVote = async (voteType: 'upvote' | 'downvote') => {
    if (!session) {
      toast.error('You need to be logged in to vote.');
      return;
    }

    try {
      if (userVote === voteType) {
        toast.error(`You have already ${voteType}d this recipe.`);
        return;
      }

      if (userVote) {
        await supabase
          .from('votes')
          .delete()
          .match({ user_id: userDetails?.user_id, recipe_id });
      }

      await supabase
        .from('votes')
        .upsert([
          { user_id: userDetails?.user_id, recipe_id, vote_type: voteType },
        ]);

      setUserVote(voteType);
      toast.success(`Successfully ${voteType}d the recipe.`);
    } catch (error) {
      console.error('Error handling vote:', error);
      toast.error('An error occurred while voting.');
    }
  };

  const handleCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(e.target.value);
  };

  const handleNicknameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const handleCommentSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!session) {
      toast.error('You need to be logged in to comment.');
      return;
    }

    if (!userDetails?.user_id) {
      toast.error('User details are not available.');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('comments')
        .insert([
          {
            recipe_id: recipe_id,
            user_id: userDetails.user_id,
            comment: newComment,
            nickname: nickname || 'Anonymous',
          },
        ])
        .select();

      if (error) throw error;

      const newCommentId = data[0]?.id;

      setNewComment('');
      setNickname('');
      setComments([
        {
          id: newCommentId,
          comment: newComment,
          user_id: userDetails.user_id,
          nickname: nickname || 'Anonymous',
        },
        ...comments,
      ]);
      toast.success('Comment added successfully.');
    } catch (error) {
      console.error('Error adding comment:', error);
      toast.error('An error occurred while adding the comment.');
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    if (!session) {
      toast.error('You need to be logged in to delete a comment.');
      return;
    }

    try {
      const { error } = await supabase
        .from('comments')
        .delete()
        .match({ id: commentId, user_id: userDetails?.user_id });

      if (error) throw error;

      setComments(comments.filter((comment) => comment.id !== commentId));
      toast.success('Comment deleted successfully.');
    } catch (error) {
      console.error('Error deleting comment:', error);
      toast.error('An error occurred while deleting the comment.');
    }
  };

  if (error && !recipe) return <NotFound statusCode={404} />;

  return (
    <section className="flex flex-col items-center p-4 mt-14">
      <h1 className="text-3xl font-bold text-center mb-6">Recipe Details</h1>

      {loading ? (
        <RecipeDetailSkeleton />
      ) : recipe ? (
        <div className="w-full max-w-2xl border dark:border-slate-600 rounded-lg overflow-hidden shadow-lg p-4">
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

            <div className="flex gap-4 mt-4">
              {session && (
                <>
                  <button
                    onClick={() => handleVote('upvote')}
                    className={`text-2xl ${userVote === 'upvote' ? 'text-green-500' : 'text-gray-500'}`}
                    aria-label="Upvote"
                  >
                    <FaThumbsUp />
                  </button>
                  <button
                    onClick={() => handleVote('downvote')}
                    className={`text-2xl ${userVote === 'downvote' ? 'text-red-500' : 'text-gray-500'}`}
                    aria-label="Downvote"
                  >
                    <FaThumbsDown />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      ) : null}

      {/* Comments Section Below the Recipe Card */}
      <div className="w-full max-w-2xl mt-8">
        <h2 className="text-xl font-semibold">Comments</h2>
        {session && (
          <form onSubmit={handleCommentSubmit} className="mt-4">
            <Input
              value={nickname}
              onChange={handleNicknameChange}
              placeholder="Your nickname (optional)"
              className="w-full p-2 border rounded-lg mb-2"
            />
            <Textarea
              value={newComment}
              onChange={handleCommentChange}
              placeholder="Add a comment"
              rows={3}
              className="w-full p-2 border rounded-lg"
            />
            <Button
              type="submit"
              className="mt-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
            >
              Add Comment
            </Button>
          </form>
        )}

        {comments.length > 0 ? (
          <ScrollArea className="mt-4 w-full max-w-full border rounded-lg overflow-hidden">
          <div
            className="flex flex-col sm:flex-row space-y-0 sm:space-x-4 p-4"
            style={{
              maxHeight: 'calc(2 * 150px + 2rem)', // Maximum height for vertical scrolling
            }}
          >
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="shrink-0 p-2 border dark:border-slate-600 rounded-lg max-w-[90vw] sm:max-w-xs"
              >
                <div className="flex justify-between items-center">
                  <p className="text-md font-semibold">
                    {comment.nickname || 'Anonymous'}
                  </p>
                  {session && comment.user_id === userDetails?.user_id && (
                    <button
                      onClick={() => handleDeleteComment(comment.id)}
                      className="text-red-500"
                      aria-label="Delete"
                    >
                      <FaTrash />
                    </button>
                  )}
                </div>
                <p className="text-md mt-2">{comment.comment}</p>
              </div>
            ))}
          </div>
          <ScrollBar orientation={window.innerWidth < 640 ? 'vertical' : 'horizontal'} />
        </ScrollArea>
        
        
        
        
        ) : (
          <p className="mt-4">No comments yet. Be the first to comment!</p>
        )}
      </div>
    </section>
  );
};

export default RecipeDetailPage;
