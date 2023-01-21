import React from "react";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { Search } from "react-feather";

export const Navbar = () => {
  return (
    <div className={styles.container}>
      <Link to="/" className={styles.logo}>
        Movies App
      </Link>
      <div className={styles.right}>
        <div className={styles.search}>
          <input type={"text"} placeholder="Search Movie..." />
          <Search />
        </div>
        <p className={styles.link}>
          <Link to="/explore">Explore</Link>
        </p>
      </div>
    </div>
  );
};
