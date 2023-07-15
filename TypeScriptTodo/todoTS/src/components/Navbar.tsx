import { Link, useSearchParams } from "react-router-dom";

const Navbar = () => {
  const [searchParams] = useSearchParams();
  const todosSearchData = searchParams.get("todos");

  return (
    <nav>
      <Link to="/" className={todosSearchData === null ? "active" : ""}>
        All
      </Link>
      <Link
        to="/?todos=active"
        className={todosSearchData === "active" ? "active" : ""}
      >
        Active
      </Link>
      <Link
        to="/?todos=completed"
        className={todosSearchData === "completed" ? "active" : ""}
      >
        Completed
      </Link>
    </nav>
  );
};

export default Navbar;
