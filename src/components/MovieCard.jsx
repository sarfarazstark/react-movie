import React from 'react';
import { Link } from 'react-router-dom';

// Define constants for magic strings to improve maintainability
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const FALLBACK_IMAGE_URL = '/no-movie.png';

const MovieCard = ({ movie }) => {
  // Destructure props here for clarity
  const {
    id,
    title,
    vote_average,
    poster_path,
    release_date,
    original_language,
  } = movie;

  // Derive values from props
  const imageUrl = poster_path
    ? `${IMAGE_BASE_URL}${poster_path}`
    : FALLBACK_IMAGE_URL;
  const year = release_date ? release_date.split('-')[0] : 'N/A';
  const rating = vote_average ? vote_average.toFixed(1) : 'NA';

  return (
    // Wrap the entire component in a Link to make it a single, clickable element
    <Link to={`/${id}`} className='movie-card'>
      <img src={imageUrl} alt={title} />
      <div className='mt-4'>
        <h3>{title}</h3>
        <div className='content'>
          <div className='rating'>
            <img src='/star.svg' alt='Star rating icon' />
            <p>{rating}</p>
          </div>
          <span>•</span>
          <p className='lang'>{original_language}</p>
          <span>•</span>
          <p className='year'>{year}</p>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
