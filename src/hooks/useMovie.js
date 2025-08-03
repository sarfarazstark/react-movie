import { useState, useEffect } from 'react';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_API_KEY = import.meta.env.VITE_MOVIE_API_KEY;

// 1) Load & await the YouTube IFrame API
let ytApiReady = null;
let ytApiReadyCallbacks = [];

function loadYouTubeIframeAPI() {
  if (window.YT && window.YT.Player) {
    return Promise.resolve(window.YT);
  }
  if (ytApiReady) return ytApiReady;

  ytApiReady = new Promise((resolve) => {
    ytApiReadyCallbacks.push(resolve);

    if (!document.getElementById('youtube-iframe-api')) {
      const tag = document.createElement('script');
      tag.id = 'youtube-iframe-api';
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);

      window.onYouTubeIframeAPIReady = () => {
        ytApiReadyCallbacks.forEach((cb) => cb(window.YT));
        ytApiReadyCallbacks = [];
      };
    }
  });

  return ytApiReady;
}

// 2) Given a YouTube videoKey, spin up an off-screen player, get duration, then destroy.
async function fetchDurationFromIframe(videoKey) {
  const YT = await loadYouTubeIframeAPI();

  return new Promise((resolve, reject) => {
    try {
      // create hidden container
      const container = document.createElement('div');
      container.style.position = 'absolute';
      container.style.left = '-9999px';
      document.body.appendChild(container);

      const player = new YT.Player(container, {
        videoId: videoKey,
        events: {
          onReady: (e) => {
            const secs = e.target.getDuration();
            // format into M:SS or H:MM:SS
            const h = Math.floor(secs / 3600);
            const m = Math.floor((secs % 3600) / 60);
            const s = Math.floor(secs % 60);
            const formatted = h
              ? `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(
                  2,
                  '0'
                )}`
              : `${m}:${String(s).padStart(2, '0')}`;

            // clean up
            player.destroy();
            document.body.removeChild(container);

            resolve({ total: secs, formatted });
          },
          onError: (err) => {
            player.destroy();
            document.body.removeChild(container);
            reject(err);
          },
        },
      });
    } catch (e) {
      reject(e);
    }
  });
}

// 3) Fetch TMDB trailer info
async function fetchTrailer(movieId) {
  const url = `${TMDB_BASE_URL}/movie/${movieId}/videos?language=en-US`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${TMDB_API_KEY}`,
    },
  });
  if (!res.ok) throw new Error('Could not fetch TMDB videos');
  const { results } = await res.json();

  const trailer = results.find(
    (v) =>
      v.site === 'YouTube' &&
      v.type === 'Trailer' &&
      v.name === 'Official Trailer'
  );
  if (!trailer) return null;

  return {
    key: trailer.key,
    url: `https://www.youtube.com/watch?v=${trailer.key}`,
  };
}

export function useMovie(movieId) {
  const [movie, setMovie] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!movieId) return;
    const ctrl = new AbortController();

    async function fetchMovie() {
      setLoading(true);
      setError('');
      try {
        // a) fetch TMDB details
        const res = await fetch(`${TMDB_BASE_URL}/movie/${movieId}`, {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${TMDB_API_KEY}`,
          },
          signal: ctrl.signal,
        });
        if (!res.ok) throw new Error('Could not fetch movie details');
        const data = await res.json();

        // b) fetch trailer URL
        const trailer = await fetchTrailer(movieId);
        if (trailer) {
          // c) fetch its duration via IFrame API
          try {
            const { total, formatted } = await fetchDurationFromIframe(
              trailer.key
            );
            trailer.durationSeconds = total;
            trailer.durationFormatted = formatted;
          } catch {
            // if something fails, ignore and just return URL
          }
          data.video = trailer;
        }

        console.log(data);

        setMovie(data);
      } catch (err) {
        if (err.name !== 'AbortError') setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchMovie();

    return () => ctrl.abort();
  }, [movieId]);

  return { movie, isLoading, error };
}
