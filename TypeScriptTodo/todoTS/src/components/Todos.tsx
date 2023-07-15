import { Todo, useTodos } from "../store/todos";
import { useSearchParams } from "react-router-dom";

const Todos = () => {
  const { todos, toggleTodoAsCompleted, handleDeleteTodo } = useTodos();
  const [urlSearchParams] = useSearchParams();
  const todosParamData = urlSearchParams.get("todos");

  let filterData: Todo[] = todos;
  if (todosParamData === "active") {
    filterData = filterData.filter((task) => !task.isCompleted);
  }
  if (todosParamData === "completed") {
    filterData = filterData.filter((task) => task.isCompleted);
  }

  return (
    <ul className="main-task">
      {filterData.map((todo: Todo) => {
        return (
          <li key={todo.id}>
            <input
              type="checkbox"
              id={`todo-${todo.id}`}
              checked={todo.isCompleted}
              onChange={() => toggleTodoAsCompleted(todo.id)}
            />
            <label htmlFor={`todo-${todo.id}`}>{todo.task}</label>
            {todo.isCompleted && (
              <button type="button" onClick={() => handleDeleteTodo(todo.id)}>
                Delete
              </button>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default Todos;
