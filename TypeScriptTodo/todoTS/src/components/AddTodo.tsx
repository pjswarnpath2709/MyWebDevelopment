import { FormEvent, useState } from "react";
import { useTodos } from "../store/todos";

const AddTodo = () => {
  const [todo, setTodo] = useState("");
  const { handleAddToDo } = useTodos();
  const handleFormSubmit = (e: FormEvent<HTMLElement>) => {
    e.preventDefault();
    handleAddToDo(todo);
    setTodo("");
  };
  return (
    <form onSubmit={handleFormSubmit}>
      <input
        type="text"
        value={todo}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setTodo(event.target.value)
        }
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddTodo;
