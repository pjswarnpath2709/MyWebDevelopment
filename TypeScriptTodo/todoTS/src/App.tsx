import { BrowserRouter } from "react-router-dom";
import AddTodo from "./components/AddTodo";
import Navbar from "./components/Navbar";
import Todos from "./components/Todos";
import "./App.css";
const App = () => {
  return (
    <BrowserRouter>
      <main>
        <Navbar />
        <AddTodo />
        <Todos />
      </main>
    </BrowserRouter>
  );
};

export default App;
