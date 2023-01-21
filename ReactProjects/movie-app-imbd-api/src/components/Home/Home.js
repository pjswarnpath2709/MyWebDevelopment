import React, { useEffect, useState } from "react";

import { getPopularMovies } from "../../api/movies";
import MovieCard from "../MovieCard/MovieCard";
import Paginate from "../Paginate/Paginate";

import styles from "./Home.module.css";

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMoreMoviesLoading, setIsMoreMoviesLoading] = useState(false);
  const [isNearEnd, setIsNearEnd] = useState(false);

  //////+++++++++++++++++++++++++++++++++++++++++//////

  const fetchPopularMovies = (page) => {
    setIsMoreMoviesLoading(true);
    getPopularMovies(page).then((res) => {
      setIsMoreMoviesLoading(false);
      setIsDataLoaded(false);
      if (!res) {
        return;
      }
      if (page === 1) {
        setPopularMovies(res?.results);
        setTotalPages(res?.total_pages);
      } else {
        setPopularMovies((prevPopularMovies) => {
          return [...prevPopularMovies, ...res?.results];
        });
      }
      setCurrentPage(res?.page);
    });
  };

  //////********************************//////

  const handlePaginate = () => {
    if (isMoreMoviesLoading || currentPage >= totalPages) return;
    fetchPopularMovies(currentPage + 1);
  };

  //////+++++++++++++++++++++++++++++++++++++++++//////

  useEffect(() => {
    fetchPopularMovies(1);
  }, []);

  useEffect(() => {
    if (isNearEnd) {
      handlePaginate();
    }
  }, [isNearEnd]);

  //////+++++++++++++++++++++++++++++++++++++++++//////

  const getInnerContainer = () => {
    return (
      <Paginate onIntersection={(isOnEnd) => setIsNearEnd(isOnEnd)}>
        <div className={styles.title}>Popular movies</div>
        <div className={styles.innerContainer}>
          {popularMovies.map((movie) => {
            return <MovieCard key={movie.id} movie={movie} />;
          })}
          {isMoreMoviesLoading && <b>Loading...</b>}
        </div>
      </Paginate>
    );
  };

  //////+++++++++++++++++++++++++++++++++++++++++//////

  return (
    <div className={styles.container}>
      {isDataLoaded ? "Loading..." : getInnerContainer()}
    </div>
  );
};

export default Home;
