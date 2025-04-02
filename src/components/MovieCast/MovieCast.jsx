import { useEffect, useState } from 'react';
import css from './MovieCast.module.css';
import { fetchCast } from '../../tmdb-api';
import { useParams } from 'react-router-dom';

export default function MovieCast() {
  const { movieId } = useParams();
  const [castInfo, setCastInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getCast() {
      try {
        setError(false);
        setLoading(true);
        const data = await fetchCast(movieId);
        setCastInfo(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getCast();
  }, [movieId]);

  return (
    <>
      {loading && <p>Loading cast details...</p>}
      {error && <p>Smth went wrong, plz reload the page!</p>}
      {castInfo.length > 0 && (
        <ul>
          {castInfo.map(person => (
            <li className={css.item} key={person.id}>
              {person.profile_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w200${person.profile_path}`}
                  alt={person.original_name}
                />
              )}
              <p>{person.name}</p>
              <p>Character: {person.character}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
