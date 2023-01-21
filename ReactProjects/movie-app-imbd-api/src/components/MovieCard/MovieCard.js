import React from "react";
import styles from "./MovieCard.module.css";
import IMAGE_PREFIX from "../../helpers/images";
import { Link } from "react-router-dom";
const MovieCard = ({ movie }) => {
  return (
    <Link
      to={`/movie/${movie.id}`}
      target="_blank"
      className={styles.container}
    >
      <img src={`${IMAGE_PREFIX}${movie?.poster_path}`} alt={movie?.title} />
      <p>{movie?.title}</p>
    </Link>
  );
};

export default MovieCard;
