import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SearchResults from '@/app/search/page';  
import { useSearchParams, useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(),
  useRouter: jest.fn(),
}));

jest.mock('@/components/ui/SkeletonCard', () => ({
  SkeletonCard: jest.fn(() => <div>Skeleton</div>),
}));

describe('SearchResults Component', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    jest.clearAllMocks();
  });

  it('displays error message when no results parameter is provided', async () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn().mockReturnValue(null),
    });

    render(<SearchResults />);

    await waitFor(() => expect(screen.getByText('No results parameter in query')).toBeInTheDocument());
  });

  it('displays error message when results are not valid', async () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn().mockReturnValue('invalid-json'),
    });

    render(<SearchResults />);

    await waitFor(() => expect(screen.getByText('Failed to parse search results')).toBeInTheDocument());
  });

  it('displays search results when valid results are provided', async () => {
    const mockResults = [
      {
        recipe_id: 1,
        title: 'Test Recipe 1',
        image_url: 'http://example.com/image.jpg',
        category: 'Dessert',
        cooking_time: '30 minutes',
        difficulty: 'Medium',
        allergy_advice: 'Contains nuts',
        ingredients: 'Sugar, flour, eggs',
      },
    ];

    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn().mockReturnValue(JSON.stringify(mockResults)),
    });

    render(<SearchResults />);

    await waitFor(() => {
      expect(screen.getByText('Test Recipe 1')).toBeInTheDocument();
    });
  });

  it('navigates to the correct recipe page when a recipe is clicked', async () => {
    const mockResults = [
      {
        recipe_id: 1,
        title: 'Test Recipe 1',
        image_url: 'http://example.com/image.jpg',
        category: 'Dessert',
        cooking_time: '30 minutes',
        difficulty: 'Medium',
        allergy_advice: 'Contains nuts',
        ingredients: 'Sugar, flour, eggs',
      },
    ];

    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn().mockReturnValue(JSON.stringify(mockResults)),
    });

    render(<SearchResults />);

    const recipeElement = screen.getByText('Test Recipe 1');
    fireEvent.click(recipeElement);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/recipe/1');
    });
  });
});