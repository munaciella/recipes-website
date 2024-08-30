/* eslint-disable @next/next/no-img-element */
'use client';
import * as React from 'react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import {
  FaThumbsUp,
  FaThumbsDown,
  FaTrash,
  FaRegComment,
} from 'react-icons/fa';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Recipe } from '@/types/recipe';
import NotFound from 'next/error';
import { NextPage } from 'next';
import {
  CommentSkeleton,
  RecipeDetailSkeleton,
} from '@/components/ui/SkeletonCard';
import { useSupabaseAuth } from '@/context/AuthContext';
import { toast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { BsSend } from 'react-icons/bs';

const RecipeDetailPage: NextPage = () => {
  const { recipe_id } = useParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userVote, setUserVote] = useState<string | null>(null);
  const [comments, setComments] = useState<
    { id: number; comment: string; user_id: number; nickname: string | null }[]
  >([]);
  const [newComment, setNewComment] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [upvotes, setUpvotes] = useState<number>(0);
  const [downvotes, setDownvotes] = useState<number>(0);
  const [shareCount, setShareCount] = useState<number>(0);
  const { session, userDetails } = useSupabaseAuth();
  const router = useRouter();

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
        setShareCount(data.share_count || 0);
        setError(null);
      }
      setLoading(false);
    };

    const fetchComments = async () => {
      if (!recipe_id) return;

      setCommentsLoading(true);
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
      setCommentsLoading(false);
    };

    const fetchVotes = async () => {
      if (!recipe_id) return;

      const { data, error } = await supabase
        .from('votes')
        .select('vote_type')
        .eq('recipe_id', recipe_id);

      if (error) {
        console.error('Error fetching votes:', error);
      } else {
        const upvoteCount = data.filter(
          (vote) => vote.vote_type === 'upvote'
        ).length;
        const downvoteCount = data.filter(
          (vote) => vote.vote_type === 'downvote'
        ).length;

        setUpvotes(upvoteCount);
        setDownvotes(downvoteCount);
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
    fetchVotes();
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

      if (voteType === 'upvote') {
        setUpvotes(upvotes + 1);
        if (userVote === 'downvote') setDownvotes(downvotes - 1);
      } else {
        setDownvotes(downvotes + 1);
        if (userVote === 'upvote') setUpvotes(upvotes - 1);
      }
    } catch (error) {
      console.error('Error handling vote:', error);
      toast.error('An error occurred while voting.');
    }
  };

  const handleCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(e.target.value.slice(0, 50));
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

const incrementShareCount = async () => {
  const newShareCount = shareCount + 1;
  setShareCount(newShareCount);

  const { error } = await supabase
    .from('recipes')
    .update({ share_count: newShareCount })
    .eq('recipe_id', recipe_id);

  if (error) {
    console.error('Error updating share count:', error);
    toast.error('Failed to update share count.');
  }
};

const handleShare = async () => {
  const shareUrl = window.location.href;
  const title = recipe?.title || 'Check out this recipe!';
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);

  if (navigator.share) {
    try {
      await navigator.share({
        title: title,
        text: `Check out this recipe: ${title}`,
        url: shareUrl,
      });
      toast.success('Recipe shared successfully!');
      await incrementShareCount();  // Increment and persist share count
    } catch (error) {
      console.error('Error sharing:', error);
      toast.error('An error occurred while sharing.');
    }
  } else {
    const shareLinks: Record<string, string | (() => void)> = {
      whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      instagram: () => {
        navigator.clipboard.writeText(shareUrl).then(() => {
          toast.success('Link copied to clipboard! You can now paste it in Instagram.');
          incrementShareCount();  // Increment and persist share count
        }).catch((error) => {
          console.error('Failed to copy text: ', error);
          toast.error('Failed to copy link. Please copy it manually.');
        });
      }
    };

    const platform = prompt('Choose a platform to share on: (whatsapp, twitter, facebook, instagram)');
    if (platform && platform in shareLinks) {
      if (platform === 'instagram') {
        (shareLinks[platform] as () => void)();
      } else {
        window.open(shareLinks[platform] as string, '_blank');
        incrementShareCount();  // Increment and persist share count
      }
    } else {
      toast.error('Unsupported platform or no platform chosen.');
    }
  }
};

  if (error && !recipe) return <NotFound statusCode={404} />;

  return (
    <section className="flex flex-col p-4 mt-12">
      <h1 className="text-4xl font-bold mb-6 text-center">Recipe Details</h1>
  
      {loading ? (
        <RecipeDetailSkeleton />
      ) : recipe ? (
        <>
          <div className="w-full max-w-2xl border dark:border-slate-600 rounded-lg overflow-hidden shadow-lg p-4 mt-6">
            <div className="w-full h-full relative">
              <img
                src={recipe.image_url}
                alt={recipe.title}
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>
            <div className="flex flex-col p-4 text-center">
              <h1 className="text-2xl font-bold mb-2">{recipe.title}</h1>
              <p className="text-lg mb-2">
                <span className="font-semibold">Category:</span> {recipe.category}
              </p>
              <p className="text-md mb-2">
                <span className="font-semibold">Cooking Time:</span> {recipe.cooking_time}
              </p>
              <p className="text-md -mb-2">
                <span className="font-semibold">Difficulty:</span> {recipe.difficulty}
              </p>
            </div>
            <div className="flex flex-col p-4">
              <p className="text-md mb-2">
                <span className="font-semibold">Ingredients:</span> {recipe.ingredients}
              </p>
              <p className="text-md mb-0">
                <span className="font-semibold">Instructions:</span> {recipe.instructions}
              </p>
            </div>
          </div>
  
          <div className="flex gap-4 mt-4 items-center">
            <button
              onClick={() => handleVote('upvote')}
              className={`flex items-center gap-1 text-xl ${userVote === 'upvote' ? 'text-green-500' : 'text-slate-600 dark:text-slate-500'}`}
              aria-label="Upvote"
            >
              <FaThumbsUp className="text-xl" />
              <span className="text-xl">{upvotes}</span>
            </button>
            <button
              onClick={() => handleVote('downvote')}
              className={`flex items-center gap-1 text-xl ${userVote === 'downvote' ? 'text-red-500' : 'text-slate-600 dark:text-slate-500'}`}
              aria-label="Downvote"
            >
              <FaThumbsDown className="text-xl" />
              <span className="text-xl">{downvotes}</span>
            </button>
            <button
              onClick={() => toast.error('You need to be logged in to comment.')}
              className="flex items-center gap-1 text-xl text-slate-600 dark:text-slate-500"
              aria-label="Comment"
            >
              <FaRegComment className="text-xl" />
              <span className="text-xl">{comments.length}</span>
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-1 text-xl text-slate-600 dark:text-slate-500"
              aria-label="Share"
            >
              <BsSend className="text-xl" />
              <span className="text-xl">{shareCount}</span>
            </button>
          </div>
        </>
      ) : null}
  
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
              maxLength={50}
            />
            <Button
              type="submit"
              className="mt-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
            >
              Add Comment
            </Button>
          </form>
        )}
  
        {commentsLoading ? (
          <>
            <CommentSkeleton />
          </>
        ) : comments.length > 0 ? (
          <ScrollArea className="mt-4 w-full max-w-full border shadow-lg dark:border-slate-600 rounded-lg overflow-hidden">
            <div
              className="flex flex-col sm:flex-row space-y-0 sm:space-x-4 p-4"
              style={{
                maxHeight: 'calc(2 * 150px + 2rem)',
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
            <ScrollBar
              orientation={window.innerWidth < 640 ? 'vertical' : 'horizontal'}
            />
          </ScrollArea>
        ) : (
          <p className="mt-4">No comments yet. Be the first to comment!</p>
        )}
      </div>
    </section>
  );
  
};

export default RecipeDetailPage;
