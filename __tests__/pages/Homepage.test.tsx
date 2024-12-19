import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Homepage } from '@/app';
import { fetchNews } from '../../src/lib/guardian';

jest.mock('../../src/lib/guardian', () => ({
  fetchNews: jest.fn(),
}));

describe('Homepage', () => {
  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation((message) => {
      if (
        !message.includes('Warning: An update to') &&
        !message.includes('act(...)')
      ) {
        console.error(message);
      }
    });
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('renders the homepage with the correct heading', () => {
    render(<Homepage />);
    const heading = screen.getByText('VeloVegans');
    expect(heading).toBeInTheDocument();
  });

  it('renders the logo image', () => {
    render(<Homepage />);
    const image = screen.getByAltText('velovegans logo');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/assets/cruelty-free-vegan.png');
  });

  it('renders the description text', () => {
    render(<Homepage />);
    const description = screen.getByText(
      'Saving the animals and our planet one meal at a time.'
    );
    expect(description).toBeInTheDocument();
  });

  it('renders the "Get Started" and "Browse Recipes" buttons', () => {
    render(<Homepage />);
    expect(screen.getByText('Get Started')).toBeEnabled();
    expect(screen.getByText('Browse Recipes')).toBeEnabled();
  });

  it('displays an error message when fetching news fails', async () => {
    (fetchNews as jest.Mock).mockRejectedValue(new Error('Failed to load news'));

    render(<Homepage />);

    await waitFor(() =>
      expect(screen.getByText('Failed to load news')).toBeInTheDocument()
    );
  });

  it('displays news articles with title and thumbnail', async () => {
    const mockNews = [
      {
        webUrl: 'http://example.com',
        webTitle: 'News Article 1',
        fields: { thumbnail: 'image1.jpg', trailText: 'Sample text' },
      },
    ];
    (fetchNews as jest.Mock).mockResolvedValue(mockNews);

    render(<Homepage />);

    await waitFor(() =>
      expect(screen.getByText('News Article 1')).toBeInTheDocument()
    );
    expect(screen.getByAltText('News Article 1')).toHaveAttribute(
      'src',
      'image1.jpg'
    );
  });

  it('loads more news when "Show More News" button is clicked', async () => {
    const mockInitialNews = [
      {
        webUrl: 'http://example1.com',
        webTitle: 'News Article 1',
        fields: { thumbnail: 'image1.jpg', trailText: 'Sample text' },
      },
    ];
    const mockMoreNews = [
      {
        webUrl: 'http://example2.com',
        webTitle: 'News Article 2',
        fields: { thumbnail: 'image2.jpg', trailText: 'Sample text' },
      },
    ];

    (fetchNews as jest.Mock)
      .mockResolvedValueOnce(mockInitialNews)
      .mockResolvedValueOnce(mockMoreNews);

    render(<Homepage />);

    await waitFor(() =>
      expect(screen.getByText('News Article 1')).toBeInTheDocument()
    );

    const showMoreButton = screen.getByText('Show More News');
    fireEvent.click(showMoreButton);

    await waitFor(() =>
      expect(screen.getByText('News Article 2')).toBeInTheDocument()
    );
  });
});