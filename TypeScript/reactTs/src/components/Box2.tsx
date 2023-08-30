import { useContext } from "react";
import { ThemeContext } from "../context";

const Box2 = () => {
  const { theme, toggleTheme } = useContext(ThemeContext)!;
  console.log(theme);
  return (
    <div className="boxContainer">
      <h1>Box 2</h1>
      <p>the Theme is : {theme}</p>
      <button onClick={toggleTheme}>Change Theme</button>
    </div>
  );
};

export default Box2;
