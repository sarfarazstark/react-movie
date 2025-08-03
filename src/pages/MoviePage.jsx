import { useParams, Link } from 'react-router-dom';
import { useMovie } from '../hooks/useMovie';
import Spinner from '../components/Spinner';
import Badge from '../components/Badge';
import { TrendingUp, Play, ArrowRight } from 'lucide-react';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export default function MoviePage() {
  const { movieId } = useParams();
  const { movie, isLoading, error } = useMovie(movieId);

  if (isLoading) {
    return (
      <div className='flex flex-col items-center justify-center min-h-screen text-white'>
        <Spinner />
      </div>
    );
  }

  if (!isLoading && !movie) {
    return (
      <div className='flex flex-col items-center justify-center min-h-screen text-white'>
        <Spinner />
      </div>
    );
  }

  const {
    title,
    release_date,
    runtime,
    vote_average,
    vote_count,
    popularity,
    poster_path,
    backdrop_path,
    video,
    homepage,
    overview,
    genres = [],
    production_countries,
    status,
    spoken_languages,
    budget,
    revenue,
    tagline,
    production_companies,
  } = movie;

  const hours = Math.floor(runtime / 60);
  const movieHr = `${hours} hr ${runtime % 60} min`;

  const formattedVoteCount =
    vote_count > 999999
      ? `${(vote_count / 1_000_000).toFixed(1)}M`
      : vote_count > 999
      ? `${(vote_count / 1_000).toFixed(1)}k`
      : vote_count;

  return (
    <div className='flex flex-col items-center justify-center min-h-screen text-white'>
      <nav className='flex items-center justify-between w-full max-w-6xl p-4'>
        <Link to='/' className='back-link'>
          ← Back to Search
        </Link>
      </nav>

      <main className='flex flex-col items-start bg-movie-container max-w-6xl p-12 rounded-2xl shadow-[0_0px_200px] shadow-shadow'>
        {error && <p className='text-red-500'>{error}</p>}

        {!error && (
          <>
            {/* Header */}
            <section className='flex justify-between items-start gap-4 w-full'>
              <div>
                <h2 className='text-4xl mb-2'>{title}</h2>
                <div className='flex items-center gap-2 text-gray-400'>
                  <span>{release_date ? release_date.slice(0, 4) : 'N/A'}</span>
                  <span>•</span>
                  <span>{movieHr}</span>
                </div>
              </div>
              <div className='flex gap-8 items-end text-xs'>
                <Badge>
                  <img
                    src='/star.svg'
                    alt='Star'
                    width={12}
                    height={12}
                    className='mb-[2px]'
                  />
                  {vote_average.toFixed(1)}/10 ({formattedVoteCount})
                </Badge>
                <Badge>
                  <TrendingUp strokeWidth={0.5} size={16} />
                  {popularity.toFixed(0)}
                </Badge>
              </div>
            </section>

            {/* Content */}
            <section className='flex flex-col md:flex-row gap-5 mt-5 w-full'>
              <figure className='w-[30%] '>
                <img
                  className='object-contain h-full w-full rounded-lg'
                  src={
                    poster_path
                      ? `${IMAGE_BASE_URL}${poster_path}`
                      : '/placeholder.png'
                  }
                  alt={title}
                />
              </figure>

              <figure className='w-[80%] shadow-md shadow-gray-950 relative'>
                <img
                  className='object-contain h-full w-full rounded-lg'
                  src={
                    backdrop_path
                      ? `${IMAGE_BASE_URL}${backdrop_path}`
                      : '/placeholder.png'
                  }
                  alt={title}
                />
                <span className='absolute w-auto bottom-0 left-0 right-0 m-4'>
                  {video.durationFormatted && (
                    <a
                      href={video.url}
                      target='_blank'
                      className=' inline-flex flex-row items-center gap-2 backdrop-blur-[1px] bg-gray-100/50 text-gray-200 rounded-full py-2 px-4 cursor-pointer hover:backdrop-blur-2xl transition-all'
                    >
                      <Play size={16} />
                      <p>Trailer</p>
                      <span>•</span>
                      <p>{video.durationFormatted}</p>
                    </a>
                  )}
                </span>
              </figure>
            </section>
            <section className='grid grid-cols-[1fr_auto] items-start gap-4 mt-8 w-full'>
              <section className='grid grid-cols-[150px_1fr] items-start gap-4 pr-10'>
                <div className='grid grid-cols-subgrid col-span-2'>
                  <h5 className='text-md leading-6'>Genres</h5>
                  <ul className='flex flex-wrap gap-2 text-xs'>
                    {genres.map((genre) => (
                      <li key={genre.id}>
                        <Badge>{genre.name}</Badge>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className='grid grid-cols-subgrid col-span-2'>
                  <h5 className='text-md leading-6'>Overview</h5>
                  <p className='text-md leading-6'>{overview}</p>
                </div>
                <div className='grid grid-cols-subgrid col-span-2'>
                  <h5 className='text-md'>Release Date</h5>
                  <p className='text-md leading-6 text-link'>
                    {new Date(release_date).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}{' '}
                    (Worldwide)
                  </p>
                </div>
                <div className='grid grid-cols-subgrid col-span-2'>
                  <h5 className='text-md leading-6'>Countries</h5>
                  <p className='text-md leading-6 text-link'>
                    {production_countries
                      .map((country) => country.name)
                      .join(' • ')}
                  </p>
                </div>
                <div className='grid grid-cols-subgrid col-span-2'>
                  <h5 className='text-md'>Status</h5>
                  <p className='text-md leading-6 text-link'>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </p>
                </div>
                <div className='grid grid-cols-subgrid col-span-2'>
                  <h5 className='text-md leading-6'>Languages</h5>
                  <p className='text-md leading-6 text-link'>
                    {spoken_languages
                      .map((language) => language.name)
                      .join(' • ')}
                  </p>
                </div>
                <div className='grid grid-cols-subgrid col-span-2'>
                  <h5 className='text-md'>Budget</h5>
                  <p className='text-md leading-6 text-link'>
                    {budget > 0
                      ? `$${(budget / 1_000_000).toFixed(2)} million`
                      : 'N/A'}
                  </p>
                </div>
                <div className='grid grid-cols-subgrid col-span-2'>
                  <h5 className='text-md'>Revenue</h5>
                  <p className='text-md leading-6 text-link'>
                    {revenue > 0
                      ? `$${(revenue / 1_000_000).toFixed(2)} million`
                      : 'N/A'}
                  </p>
                </div>
                <div className='grid grid-cols-subgrid col-span-2'>
                  <h5 className='text-md'>Tagline</h5>
                  <p className='text-md leading-6 text-link'>{tagline}</p>
                </div>
                <div className='grid grid-cols-subgrid col-span-2'>
                  <h5 className='text-md leading-6'>Production Companies</h5>
                  <p className='text-md leading-6 text-link'>
                    {production_companies
                      .map((company) => company.name)
                      .join(' • ')}
                  </p>
                </div>
              </section>
              <a
                href={
                  homepage && /^https?:\/\//.test(homepage)
                    ? homepage
                    : undefined
                }
                rel='noopener noreferrer'
                className='inline-flex items-center gap-2 bg-gradient text-primary font-bold px-4 py-2 rounded-md hover:bg-primary/80 transition-all'
              >
                Visit Homepage <ArrowRight strokeWidth={0.5} size={16} />
              </a>
            </section>
          </>
        )}
      </main>
    </div>
  );
}
