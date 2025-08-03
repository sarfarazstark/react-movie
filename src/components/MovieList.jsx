import Spinner from './Spinner';
import MovieCard from './MovieCard';

const MovieList = ({ movies, isLoading, error, searchTerm }) => {
  const hasMovies = movies.length > 0;

  return (
    <section className='all-movies'>
      {(isLoading || error || hasMovies) && (
        <h2>{searchTerm ? `Results for "${searchTerm}"` : 'Popular Movies'}</h2>
      )}

      {isLoading && <Spinner />}

      {!isLoading && error && <p className='text-red-500'>{error}</p>}

      {!isLoading && !error && hasMovies && (
        <ul>
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </ul>
      )}
    </section>
  );
};

export default MovieList;
