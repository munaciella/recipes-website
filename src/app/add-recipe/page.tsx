/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useState } from 'react';
import { NextPage } from 'next';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SkeletonCard } from '@/components/ui/SkeletonCard';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabaseClient';
import { Textarea } from '@/components/ui/textarea';

const AddRecipePage: NextPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    image_url: '',
    category: '',
    cooking_time: '',
    difficulty: 'Easy',
    allergy_advice: '',
    ingredients: '',
    instructions: '',
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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
    const {
      title,
      image_url,
      category,
      cooking_time,
      difficulty,
      ingredients,
      instructions,
    } = formData;

    if (!title.match(/^[a-zA-Z ]+$/)) {
      toast.error('Title must only contain letters.');
      return false;
    }
    if (!image_url.match(/^https?:\/\/.+(\.(jpg|jpeg|png|webp|gif))?$/)) {
      toast.error('Image URL is not valid.');
      return false;
    }
    if (!category.match(/^[a-zA-Z ]+$/)) {
      toast.error('Category must only contain letters.');
      return false;
    }
    if (!cooking_time.trim().match(/^\d+\s?(min|mins|hr|hrs)(\s?and\s?\d+\s?(min|mins))?$/)) {
      toast.error('Cooking time must be in a valid format, e.g., "15 mins", "1 hr", "1 hr and 10 mins".');
      return false;
    }
    if (!['Easy', 'Medium', 'Hard'].includes(difficulty)) {
      toast.error('Difficulty must be Easy, Medium, or Hard.');
      return false;
    }
    if (!ingredients.match(/^([A-Z][a-z]+(?: [A-Z][a-z]+)*)(, [A-Z][a-z]+(?: [A-Z][a-z]+)*)*$/)) {
      toast.error('Ingredients must be comma-separated and start with a capital letter.');
      return false;
    }
    if (!instructions.match(/^\d+\..+(\.\s?)*$/)) {
      toast.error('Instructions must follow the numbered format.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (!validateFields()) return;
  
    const {
      title,
      image_url,
      category,
      cooking_time,
      difficulty,
      allergy_advice,
      ingredients,
      instructions,
    } = formData;
  
    const trimmedCookingTime = cooking_time.trim();
  
    try {
      setLoading(true);
  
      const formattedIngredients = ingredients
        .split(',')
        .map((ingredient) => ingredient.trim())  
        .join(', ');  
  
      const formattedInstructions = instructions
        .split('\n')  
        .map((instr, index) => {
          const trimmedInstr = instr.trim();
          if (trimmedInstr.startsWith('1.')) {
            return `${index + 1}. ${trimmedInstr.slice(2).trim()}`; 
          }
          return `${index + 1}. ${trimmedInstr}`;
        })
        .join(' ');  
  
      const { data: existingRecipe } = await supabase
        .from('recipes')
        .select('title')
        .eq('title', title)
        .single();
  
      if (existingRecipe) {
        toast.error('A recipe with this title already exists!');
        return;
      }
  
      const { error } = await supabase.from('recipes').insert([
        {
          title: capitalizeWords(title),
          image_url,
          category: capitalizeWords(category),
          cooking_time: trimmedCookingTime,
          difficulty,
          allergy_advice,
          ingredients: formattedIngredients,  
          instructions: formattedInstructions,
        },
      ]);
  
      if (error) throw error;
  
      toast.success('Recipe added successfully!');
      setFormData({
        title: '',
        image_url: '',
        category: '',
        cooking_time: '',
        difficulty: 'Easy',
        allergy_advice: '',
        ingredients: '',
        instructions: '',
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(`Error: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };  

  if (loading) return <SkeletonCard />;

  return (
    <section className="min-h-screen flex flex-col items-center justify-start bg-background dark:bg-background w-full px-4 lg:px-0 mt-24 sm:mt-28 md:mt-32">
      <div className="w-full lg:w-[70%] xl:w-[60%] md:w-[60%] bg-card rounded-lg shadow-lg p-8 space-y-6 border border-border dark:border-slate-700">
        <h1 className="text-4xl font-bold text-center mb-6 text-card-foreground dark:text-white mt-2">
          Add a New Recipe
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            name="title"
            placeholder="Title (e.g., Veggie Tacos)"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full"
          />
          <Input
            name="image_url"
            placeholder="Image URL"
            value={formData.image_url}
            onChange={handleInputChange}
            className="w-full"
          />
          <Input
            name="category"
            placeholder="Category (e.g., Main Course)"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full"
          />
          <Input
            name="cooking_time"
            placeholder="Cooking Time (e.g., 5 mins)"
            value={formData.cooking_time}
            onChange={handleInputChange}
            className="w-full"
          />
          <select
            name="difficulty"
            value={formData.difficulty}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border rounded-lg bg-card dark:bg-input text-card-foreground"
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
          <Input
            name="allergy_advice"
            placeholder="Allergy Advice (e.g., Nut-Free)"
            value={formData.allergy_advice}
            onChange={handleInputChange}
            className="w-full"
          />
          <Input
            name="ingredients"
            placeholder="Ingredients (e.g., Flour, Sugar, Eggs)"
            value={formData.ingredients}
            onChange={handleInputChange}
            className="w-full"
          />
          <Textarea
            name="instructions"
            placeholder="Instructions (e.g., 1. Do this. 2. Do that.)"
            value={formData.instructions}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border rounded-lg bg-card dark:bg-input text-card-foreground"
          />
          <Button
            type="submit"
            className="w-full py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
          >
            Submit Recipe
          </Button>
        </form>
      </div>
    </section>
  );  
};
export default AddRecipePage;
