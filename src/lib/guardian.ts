import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_GUARDIAN_API_KEY;
const BASE_URL = 'https://content.guardianapis.com/search';

export const fetchNews = async (page: number = 1) => {
  const params = {
    'api-key': API_KEY,
    section: 'environment',
    q: 'vegan',
    'page-size': 6,
    'page': page,
    'order-by': 'newest',
    'show-fields': 'thumbnail,trailText',
  };

  try {
    const response = await axios.get(BASE_URL, { params });
    return response.data.response.results;
  } catch (error) {
    console.error('Error fetching news:', error);
    throw new Error('Failed to fetch news.');
  }
};
