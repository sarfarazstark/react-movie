import { useState, useEffect } from 'react';
import { updateSearchCount } from '../appwrite';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_MOVIE_API_KEY;

const OPTIONS = {
  method: 'get',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
};

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // AbortController helps cancel a fetch request if the component unmounts
    // or if a new request is made before the old one finishes.
    const controller = new AbortController();

    const fetchMovies = async () => {
      setIsLoading(true);
      setError('');
      try {
        const endpoint = query
          ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
          : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

        const response = await fetch(endpoint, {
          ...OPTIONS,
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error('Something went wrong while fetching movies.');
        }

        const data = await response.json();
        if (!data.results || data.results.length === 0) {
          throw new Error('No movies found.');
        }

        console.log('Fetched movies:', data.results);

        setMovies(data.results);

        // Track the search in Appwrite
        if (query) {
          await updateSearchCount(query, data.results[0]);
        }
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error(err.message);
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    // Don't fetch if the query is too short or on initial load with an empty query (handled by discover).
    // Or adjust this logic as needed. Let's fetch popular movies if the query is empty.
    fetchMovies();

    // Cleanup function to abort fetch on re-render or unmount
    return () => {
      controller.abort();
    };
  }, [query]); // Re-run effect only when the debounced query changes

  return { movies, isLoading, error };
}
