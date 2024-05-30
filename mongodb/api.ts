interface Recipe {
    title: string;
    image: { src: string; alt: string };  
    ingredients: string[];
    instructions: string[];
    cookingTime: string;
  }

export const fetchRecipes = async (): Promise<Recipe[]> => {
    const response = await fetch('/api/recipes');
    if (!response.ok) {
      throw new Error('Failed to fetch recipes');
    }
    const data = await response.json();
    return data;
  };
  