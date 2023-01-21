const API_KEY = "2b9b57649ca1dfdf65721d336e0991f5";

const API_DOMAIN = "https://api.themoviedb.org/3";

export const getPopularMovies = async (page) => {
  try {
    const response = await fetch(
      `${API_DOMAIN}/movie/popular?api_key=${API_KEY}&page=${page}`
    );

    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const getGenre = async () => {
  try {
    const res = await fetch(
      `${API_DOMAIN}/genre/movie/list?api_key=${API_KEY}`
    );
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const getMovieImages = async (id) => {
  try {
    const res = await fetch(
      `${API_DOMAIN}/movie/${id}/images?api_key=${API_KEY}`
    );
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const getMovieDetails = async (id) => {
  try {
    const res = await fetch(`${API_DOMAIN}/movie/${id}?api_key=${API_KEY}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const getSimilarMovies = async (id) => {
  try {
    const res = await fetch(
      `${API_DOMAIN}/movie/${id}/similar?api_key=${API_KEY}`
    );
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const getMoviesWithGenreId = async (id, page = 1) => {
  try {
    const res = await fetch(
      `${API_DOMAIN}/discover/movie?api_key=${API_KEY}&with_genres=${id}&sort_by=popularity.desc&page=${page}`
    );
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const searchMovie = async (query) => {
  try {
    const res = await fetch(
      `${API_DOMAIN}/search/movie?api_key=${API_KEY}&query=${query}`
    );
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    return false;
  }
};
