export interface Recipe {
    recipe_id: number;
    title: string;
    image_url: string;
    category: string;
    cooking_time: string;
    difficulty: string;
    allergy_advice: string;
    ingredients: string[];
    instructions: string[];
    created_at: string;
    created_by: number;
}