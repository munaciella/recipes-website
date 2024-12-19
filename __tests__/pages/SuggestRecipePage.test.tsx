import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SuggestRecipePage from '@/app/suggest-recipe/page';
import { supabase } from '../../src/lib/supabaseClient';
import { toast } from '../../src/components/ui/use-toast';

jest.mock('../../src/lib/supabaseClient', () => ({
  supabase: {
    auth: {
      getUser: jest.fn(),
    },
    from: jest.fn().mockReturnValue({
      select: jest.fn(),
      insert: jest.fn(),
      eq: jest.fn().mockReturnThis(),
      single: jest.fn(),
    }),
  },
}));

jest.mock('../../src/components/ui/use-toast', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe('SuggestRecipePage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the form fields correctly', () => {
    render(<SuggestRecipePage />);

    expect(screen.getByPlaceholderText('Recipe Name (e.g., Banana Pancakes)')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Category (e.g., Starter, Main Course)')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Ingredient 1 (e.g., Peanut Butter)')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Ingredient 2 (e.g., Jelly)')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Ingredient 3 (e.g., Bread)')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit suggestion/i })).toBeInTheDocument();
  });

  it('validates fields before submission', async () => {
    render(<SuggestRecipePage />);

    fireEvent.change(screen.getByPlaceholderText('Recipe Name (e.g., Banana Pancakes)'), {
      target: { value: '1234' },
    });
    fireEvent.change(screen.getByPlaceholderText('Category (e.g., Starter, Main Course)'), {
      target: { value: 'Dessert' },
    });
    fireEvent.click(screen.getByRole('button', { name: /submit suggestion/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Recipe Name must contain only letters and spaces.');
    });
  });

  it('submits valid data successfully', async () => {
    (supabase.auth.getUser as jest.Mock).mockResolvedValueOnce({
      data: { user: { id: 'mock-user-id' } },
    });
    (supabase.from as jest.Mock).mockReturnValueOnce({
      select: jest.fn().mockReturnValueOnce({
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValueOnce({ data: { user_id: 1 } }),
      }),
    });
    (supabase.from as jest.Mock).mockReturnValueOnce({
      insert: jest.fn().mockResolvedValueOnce({}),
    });

    render(<SuggestRecipePage />);

    fireEvent.change(screen.getByPlaceholderText('Recipe Name (e.g., Banana Pancakes)'), {
      target: { value: 'Banana Pancakes' },
    });
    fireEvent.change(screen.getByPlaceholderText('Category (e.g., Starter, Main Course)'), {
      target: { value: 'Dessert' },
    });
    fireEvent.change(screen.getByPlaceholderText('Ingredient 1 (e.g., Peanut Butter)'), {
      target: { value: 'Banana' },
    });
    fireEvent.change(screen.getByPlaceholderText('Ingredient 2 (e.g., Jelly)'), {
      target: { value: 'Flour' },
    });
    fireEvent.change(screen.getByPlaceholderText('Ingredient 3 (e.g., Bread)'), {
      target: { value: 'Milk' },
    });

    fireEvent.click(screen.getByRole('button', { name: /submit suggestion/i }));

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Suggestion submitted successfully!');
    });
    expect(supabase.from).toHaveBeenCalledWith('suggestions');
  });

  it('handles submission errors gracefully', async () => {
    (supabase.auth.getUser as jest.Mock).mockResolvedValueOnce({
      data: { user: { id: 'mock-user-id' } },
    });
    (supabase.from as jest.Mock).mockReturnValueOnce({
      select: jest.fn().mockReturnValueOnce({
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValueOnce({ data: { user_id: 1 } }),
      }),
    });
    (supabase.from as jest.Mock).mockReturnValueOnce({
      insert: jest.fn().mockRejectedValueOnce(new Error('Insert failed')),
    });

    render(<SuggestRecipePage />);

    fireEvent.change(screen.getByPlaceholderText('Recipe Name (e.g., Banana Pancakes)'), {
      target: { value: 'Banana Pancakes' },
    });
    fireEvent.change(screen.getByPlaceholderText('Category (e.g., Starter, Main Course)'), {
      target: { value: 'Dessert' },
    });
    fireEvent.change(screen.getByPlaceholderText('Ingredient 1 (e.g., Peanut Butter)'), {
      target: { value: 'Banana' },
    });
    fireEvent.change(screen.getByPlaceholderText('Ingredient 2 (e.g., Jelly)'), {
      target: { value: 'Flour' },
    });
    fireEvent.change(screen.getByPlaceholderText('Ingredient 3 (e.g., Bread)'), {
      target: { value: 'Milk' },
    });

    fireEvent.click(screen.getByRole('button', { name: /submit suggestion/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Error submitting recipe suggestion.');
    });
  });
});