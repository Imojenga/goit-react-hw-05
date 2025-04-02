import { useEffect, useState } from 'react';
import MovieList from '../../components/MovieList/MovieList';
import { fetchMovieByQuery } from '../../tmdb-api';
import { useSearchParams } from 'react-router-dom';
import css from './MoviesPage.module.css';

export default function MoviesPage() {
  const [queryMovies, setQueryMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';
  const [searchQuery, setSearchQuery] = useState(query);

  const handleChange = e => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const nextParams = new URLSearchParams(searchParams);
    if (searchQuery.trim() !== '') {
      nextParams.set('query', searchQuery);
    } else {
      nextParams.delete('query');
      alert('Please enter smth...');
    }
    setSearchParams(nextParams);
  };

  useEffect(() => {
    if (query === '') {
      setSearchQuery('');
      setError(false);
      setQueryMovies([]);
      return;
    }
    async function getMovies() {
      try {
        setSearchQuery('');
        setError(false);
        setLoading(true);
        const data = await fetchMovieByQuery(query);
        if (data.length === 0) {
          setError(true);
          setQueryMovies([]);
        } else {
          setQueryMovies(data);
        }
      } catch {
        setError(true);
        setQueryMovies([]);
      } finally {
        setLoading(false);
      }
    }
    getMovies();
  }, [query]);

  return (
    <>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.input}
          type="text"
          name="text"
          value={searchQuery}
          onChange={handleChange}
        />
        <button className={css.btn} type="submit">
          Search
        </button>
      </form>
      {loading && <p>Loading movies...</p>}
      {error && (
        <p>Smth went wrong, plz reload the page or try another title!</p>
      )}
      {queryMovies.length > 0 && <MovieList movies={queryMovies} />}
    </>
  );
}
