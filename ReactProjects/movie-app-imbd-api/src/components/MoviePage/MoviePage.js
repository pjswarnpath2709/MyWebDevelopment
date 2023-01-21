import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import MovieCard from "../MovieCard/MovieCard";

import styles from "./MoviePage.module.css";

import { getMovieDetails, getSimilarMovies } from "../../api/movies";
import MOVIE_PREFIX from "../../helpers/images";

//////-------------------------------------------------------------------------------------------------------------------------------//////

const MoviePage = () => {
  const { movieId } = useParams();

  //////+++++++++++++++++++++++++++++++++++++++++//////

  const [movieDetails, setMovieDetails] = useState({});
  const [similarMovies, setSimilarMovies] = useState([]);

  //////+++++++++++++++++++++++++++++++++++++++++//////

  const fetchMovieDetails = () => {
    getMovieDetails(movieId).then((data) => {
      if (!data) return;
      setMovieDetails(data);
    });
  };

  const fetchSimilarMovies = () => {
    getSimilarMovies(movieId).then((data) => {
      if (!data) return;
      setSimilarMovies(data?.results);
    });
  };

  //////+++++++++++++++++++++++++++++++++++++++++//////
  useEffect(() => {
    fetchMovieDetails();
    fetchSimilarMovies();
  }, []);

  //////+++++++++++++++++++++++++++++++++++++++++//////
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <img
          src={
            movieDetails.backdrop_path
              ? `${MOVIE_PREFIX}${movieDetails?.backdrop_path}`
              : ""
          }
          alt={`${movieDetails?.title}`}
        />
        <div className={styles.details}>
          <label>Tile</label>
          <div className={styles.title}>{movieDetails?.title}</div>
          <div className={styles.sub}>{movieDetails?.tagline}</div>
          <label>Story</label>
          <div className={styles.desc}>{movieDetails?.overview}</div>
          <label>Runtime</label>
          <div className={styles.desc}>{movieDetails?.runtime} mins</div>
        </div>
      </div>
      <div className={styles.similar}>
        <div className={styles.title}>Similar Movies</div>
        <div className={styles.movies}>
          {similarMovies.map((movie) => {
            return <MovieCard key={movie.id} movie={movie} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
