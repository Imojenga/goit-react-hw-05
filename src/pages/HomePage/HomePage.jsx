import { useEffect, useState } from 'react';
import MovieList from '../../components/MovieList/MovieList';
import { fetchTrendMovies } from '../../tmdb-api';

export default function HomePage() {
  const [trendMovies, setTrendMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getMovies() {
      try {
        setError(false);
        setLoading(true);
        const data = await fetchTrendMovies();
        setTrendMovies(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getMovies();
  }, []);

  return (
    <>
      <h1>Trending today:</h1>
      {loading && <p>Loading movies...</p>}
      {error && <p>Smth went wrong, plz reload the page!</p>}
      {trendMovies.length > 0 && <MovieList movies={trendMovies} />}
    </>
  );
}
