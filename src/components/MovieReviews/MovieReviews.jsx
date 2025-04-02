import { useEffect, useState } from 'react';
import css from './MovieReviews.module.css';
import { fetchReviews } from '../../tmdb-api';
import { useParams } from 'react-router-dom';

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviewsInfo, setReviewsInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getReviews() {
      try {
        setError(false);
        setLoading(true);
        const data = await fetchReviews(movieId);
        setReviewsInfo(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getReviews();
  }, [movieId]);

  return (
    <>
      {loading && <p>Loading reviews...</p>}
      {error && <p>Smth went wrong, plz reload the page!</p>}
      {reviewsInfo.length > 0 && (
        <ul>
          {reviewsInfo.map(rev => (
            <li className={css.item} key={rev.id}>
              <h3>Author: {rev.author}</h3>
              <p>{rev.content}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
