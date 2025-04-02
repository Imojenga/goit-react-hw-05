import { useEffect, useRef, useState, Suspense } from 'react';
import {
  Outlet,
  useParams,
  NavLink,
  Link,
  useLocation,
} from 'react-router-dom';
import { fetchMovieById } from '../tmdb-api';
import css from './MovieDetailsPage.module.css';
import clsx from 'clsx';

const getNavStyles = ({ isActive }) => {
  return clsx(css.navLink, isActive && css.active);
};

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const location = useLocation();
  const backLinkRef = useRef(location.state);

  useEffect(() => {
    async function getMovie() {
      try {
        setError(false);
        setLoading(true);
        const data = await fetchMovieById(movieId);
        setMovie(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getMovie();
  }, [movieId]);

  return (
    <>
      <Link className={css.link} to={backLinkRef.current}>
        Go back
      </Link>

      {loading && <p>Loading movie details...</p>}
      {error && <p>Smth went wrong, plz reload the page!</p>}
      {movie && (
        <div className={css.movie}>
          <img
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={movie.original_title}
          />
          <div className={css.info}>
            <div>
              <h2>
                {movie.title} {new Date(movie.release_date).getFullYear()}
              </h2>
              <p>User Score: {Math.round(movie.vote_average * 10)}%</p>
            </div>
            <div>
              <h3>Overview</h3>
              <p>{movie.overview}</p>
            </div>
            <div>
              <h3>Genres</h3>
              <p>{movie.genres.map(el => el.name).join(', ')}</p>
            </div>
          </div>
        </div>
      )}

      <h2>Additional information:</h2>
      <ul>
        <li>
          <NavLink className={getNavStyles} to="cast">
            Cast
          </NavLink>
        </li>
        <li>
          <NavLink className={getNavStyles} to="reviews">
            Reviews
          </NavLink>
        </li>
      </ul>

      <Suspense fallback={<p>Loading...</p>}>
        <Outlet />
      </Suspense>
    </>
  );
}
