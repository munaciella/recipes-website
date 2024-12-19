import { render, screen, waitFor } from '@testing-library/react';
import { useSupabaseAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import SavedRecipesPage from '@/app/saved-recipes/page';

jest.mock('@/context/AuthContext', () => ({
  useSupabaseAuth: jest.fn(),
}));

jest.mock('@/lib/supabaseClient', () => ({
  supabase: {
    from: jest.fn().mockReturnThis(),
    select: jest.fn().mockResolvedValue({ data: [], error: null }),
    eq: jest.fn().mockReturnThis(),
  },
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('SavedRecipesPage', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    jest.clearAllMocks();
  });

  it('displays no saved recipes message when there are no saved recipes', async () => {
    (useSupabaseAuth as jest.Mock).mockReturnValue({
      session: { user: { user_id: 1 } },
      userDetails: { user_id: 1 },
    });

    render(<SavedRecipesPage />);

    await waitFor(() =>
      expect(
        screen.getByText('You have no saved recipes yet.')
      ).toBeInTheDocument()
    );
  });
});
