import React, { useEffect, useState } from "react";

import styles from "./Explore.module.css";
import { getGenre, getMoviesWithGenreId } from "../../api/movies";
import deepCopy from "../../utils/deepCopy";
import Paginate from "../Paginate/Paginate";
import MovieCard from "../MovieCard/MovieCard";
import getUniqueKey from "../../utils/unique";

const Explore = () => {
  //////+++++++++++++++++++++++++++++++++++++++++//////

  const [allGenres, setAllGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isMoreMoviesLoading, setIsMoreMoviesLoading] = useState(false);
  const [isNearEnd, setIsNearEnd] = useState(false);

  //////+++++++++++++++++++++++++++++++++++++++++//////

  const fetchAllGenres = () => {
    getGenre().then((res) => {
      if (!res) return;
      setAllGenres(res.genres);
      setSelectedGenres([res.genres[0]]);
    });
  };

  const fetchMoviesWithGenres = (page) => {
    setIsMoreMoviesLoading(true);
    if (selectedGenres.length === 0) return;
    const ids = selectedGenres.map((genre) => genre.id).join(",");
    getMoviesWithGenreId(ids, page).then((res) => {
      setIsMoreMoviesLoading(false);
      if (!res) return;
      if (page === 1) {
        setTotalPages(res?.total_pages);
        setMovies(res?.results);
      } else {
        setMovies((prevMovies) => [...prevMovies, ...res.results]);
      }
      setCurrentPage(res?.page);
    });
  };

  //////+++++++++++++++++++++++++++++++++++++++++//////

  const handleGenreClick = (genre) => {
    const tempSelectedGenres = deepCopy(selectedGenres);
    const index = tempSelectedGenres.findIndex(
      (genreItem) => genreItem.id === genre.id
    );
    if (index < 0) {
      // add the current index else remove it
      tempSelectedGenres.push(genre);
    } else {
      if (tempSelectedGenres.length > 1) tempSelectedGenres.splice(index, 1);
    }

    // update the genres
    setSelectedGenres(tempSelectedGenres);
  };

  const handlePaginate = () => {
    if (isMoreMoviesLoading || currentPage >= totalPages) return;
    fetchMoviesWithGenres(currentPage + 1);
  };

  //////+++++++++++++++++++++++++++++++++++++++++//////

  useEffect(() => {
    fetchAllGenres();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
    fetchMoviesWithGenres(1);
  }, [selectedGenres]);

  useEffect(() => {
    if (isNearEnd) {
      handlePaginate();
    }
  }, [isNearEnd]);

  //////+++++++++++++++++++++++++++++++++++++++++//////

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {allGenres.map((genre) => {
          return (
            <div
              key={genre.id}
              className={`${styles.chip} ${
                selectedGenres.find((item) => item.id === genre.id)
                  ? styles.activeChip
                  : ""
              }`}
              onClick={(event) => {
                event.stopPropagation();
                handleGenreClick(genre);
              }}
            >
              {genre.name}
            </div>
          );
        })}
      </div>
      <p className={styles.title}>Explore Movies</p>

      <Paginate onIntersection={(isOnEnd) => setIsNearEnd(isOnEnd)}>
        <div className={styles.body}>
          {movies.map((movie) => {
            return (
              <MovieCard
                key={getUniqueKey(`Movie_${movie.id}`)}
                movie={movie}
              />
            );
          })}
          {isMoreMoviesLoading && <b>Loading...</b>}
        </div>
      </Paginate>
    </div>
  );

  //////+++++++++++++++++++++++++++++++++++++++++//////
};

export default Explore;
