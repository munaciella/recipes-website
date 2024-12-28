/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useState } from 'react';
import { NextPage } from 'next';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SkeletonCard } from '@/components/ui/SkeletonCard';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabaseClient';

const SuggestRecipePage: NextPage = () => {
  const [formData, setFormData] = useState({
    recipe_name: '',
    category: '',
    ingredient_1: '',
    ingredient_2: '',
    ingredient_3: '',
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const capitalizeWords = (str: string) =>
    str
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

  const validateFields = () => {
    const { recipe_name, category, ingredient_1, ingredient_2, ingredient_3 } =
      formData;

    if (!recipe_name.match(/^[a-zA-Z ]+$/)) {
      toast.error('Recipe Name must contain only letters and spaces.');
      return false;
    }
    if (!category.match(/^[a-zA-Z ]+$/)) {
      toast.error('Category must contain only letters and spaces.');
      return false;
    }
    if (
      [ingredient_1, ingredient_2, ingredient_3].some(
        (ing) => ing.trim() && !ing.match(/^[a-zA-Z ]+$/)
      )
    ) {
      toast.error('Ingredients must contain only letters and spaces.');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateFields()) return;

    const { recipe_name, category, ingredient_1, ingredient_2, ingredient_3 } =
      formData;

    try {
      setLoading(true);

      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        toast.error('Unable to fetch user information.');
        throw authError || new Error('No authenticated user found.');
      }

      // Fetch the integer `user_id` from the `users` table
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('user_id')
        .eq('user_uuid', user.id)
        .single();

      if (userError || !userData) {
        toast.error('Unable to fetch user details.');
        throw userError || new Error('User not found in database.');
      }

      const userId = userData.user_id;

      const { error } = await supabase.from('suggestions').insert([
        {
          recipe_name: capitalizeWords(recipe_name),
          category: capitalizeWords(category),
          ingredient_1: capitalizeWords(ingredient_1),
          ingredient_2: capitalizeWords(ingredient_2),
          ingredient_3: capitalizeWords(ingredient_3),
          created_by: userId, // Use the integer `user_id`
        },
      ]);

      if (error) throw error;

      toast.success('Suggestion submitted successfully!');
      setFormData({
        recipe_name: '',
        category: '',
        ingredient_1: '',
        ingredient_2: '',
        ingredient_3: '',
      });
    } catch (error: unknown) {
      toast.error('Error submitting recipe suggestion.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <SkeletonCard />;

  return (
    <section className="min-h-screen flex flex-col items-center justify-start bg-background dark:bg-background w-full px-4 lg:px-0 mt-24 sm:mt-28 md:mt-32">
      <div className="w-full lg:w-[70%] xl:w-[60%] md:w-[60%] bg-card rounded-lg shadow-lg p-8 space-y-6 border border-border dark:border-slate-700">
        <h1 className="text-4xl font-bold text-center mb-6 text-card-foreground dark:text-white mt-2">
          Suggest a Recipe
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            name="recipe_name"
            placeholder="Recipe Name (e.g., Banana Pancakes)"
            value={formData.recipe_name}
            onChange={handleInputChange}
            className="w-full"
          />
          <Input
            name="category"
            placeholder="Category (e.g., Starter, Main Course)"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full"
          />
          <Input
            name="ingredient_1"
            placeholder="Ingredient 1 (e.g., Peanut Butter)"
            value={formData.ingredient_1}
            onChange={handleInputChange}
            className="w-full"
          />
          <Input
            name="ingredient_2"
            placeholder="Ingredient 2 (e.g., Jelly)"
            value={formData.ingredient_2}
            onChange={handleInputChange}
            className="w-full"
          />
          <Input
            name="ingredient_3"
            placeholder="Ingredient 3 (e.g., Bread)"
            value={formData.ingredient_3}
            onChange={handleInputChange}
            className="w-full"
          />
          <Button
            type="submit"
            className="w-full py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
          >
            Submit Suggestion
          </Button>
        </form>
      </div>
    </section>
  );
};

export default SuggestRecipePage;
