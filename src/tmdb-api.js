import axios from 'axios';

const options = {
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzODQyMDVjNjA2YzNiYTRmOWQ5ZDllNmU2MWQ4OTU0YSIsIm5iZiI6MTc0MzE5NDY1NS40MjIwMDAyLCJzdWIiOiI2N2U3MGExZmZhMDE1ZjRhMmM3NjdkYzMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.iZ_QiTHfi6zJ6DfL-t2T7f9Kz8lOznVDnE5XQnajrsw',
  },
};

export const fetchTrendMovies = async () => {
  const response = await axios.get(
    'https://api.themoviedb.org/3/trending/movie/day',
    options
  );
  return response.data.results;
};

export const fetchMovieById = async movieId => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}`,
    options
  );
  return response.data;
};

export const fetchCast = async movieId => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/credits`,
    options
  );
  return response.data.cast;
};

export const fetchReviews = async movieId => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/reviews`,
    options
  );
  return response.data.results;
};

export const fetchMovieByQuery = async query => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/search/movie?query=${query}`,
    options
  );
  return response.data.results;
};
