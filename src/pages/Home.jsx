import { useEffect, useState } from 'react';
import { useDebounce } from 'react-use';
import { useMovies } from '../hooks/useMovies';
import Search from '../components/Search';
import MovieCard from '../components/MovieCard';
import Spinner from '../components/Spinner';
import { getTrendingMovies } from '../appwrite';
import { Link } from 'react-router-dom';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [trendingMovies, setTrendingMovies] = useState([]);

  // Debounce the input to avoid excessive API calls
  useDebounce(
    () => {
      setDebouncedSearchTerm(searchTerm);
    },
    800,
    [searchTerm]
  );

  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();
      setTrendingMovies(movies);
    } catch (error) {
      console.error(`Error fetching trending movies: ${error}`);
    }
  };

  useEffect(() => {
    loadTrendingMovies();
  }, []);

  const { movies, isLoading, error } = useMovies(debouncedSearchTerm);

  return (
    <main>
      <div className='pattern' />
      <div className='wrapper'>
        <header>
          <img src='./hero.png' alt='Hero Banner' />
          <h1>
            Find <span className='text-gradient'>Movies</span> You'll Enjoy
            Without the Hassle
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        {trendingMovies.length > 0 && (
          <section className='trending'>
            <h2>Trending Movies</h2>

            <ul>
              {trendingMovies.map((movie, index) => (
                <Link to={`/${movie.movie_id}`}>
                  <li key={movie.$id}>
                    <p>{index + 1}</p>
                    <img src={movie.poster_url} alt={movie.title} />
                  </li>
                </Link>
              ))}
            </ul>
          </section>
        )}

        <section className='all-movies'>
          <h2>
            {debouncedSearchTerm
              ? `Results for "${debouncedSearchTerm}"`
              : 'Popular Movies'}
          </h2>

          {isLoading && <Spinner />}

          {!isLoading && error && <p className='error-message'>{error}</p>}

          {!isLoading && !error && (
            <ul>
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
};

export default Home;
