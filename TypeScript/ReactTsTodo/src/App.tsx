import { useEffect, useState } from "react";
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Stack,
  TextField,
  Button,
} from "@mui/material";
import TodoItem from "./components/TodoItem";
import { saveLocal, getLocal } from "./utils/features";

function App() {
  const [todos, setTodos] = useState<TodoItemType[]>(getLocal());

  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    saveLocal(todos);
  }, [todos]);

  const addTodoHandler = (
    e:
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | React.KeyboardEvent<HTMLDivElement>
  ): void => {
    e.preventDefault();
    const todo: TodoItemType = {
      title,
      isCompleted: false,
      id: String(Math.random() * 1000 + Date.now()),
    };
    setTitle("");
    const updatedTodos = [...todos, todo];

    setTodos(updatedTodos);
  };

  const completeHandler = (todoId: string, value: boolean): void => {
    const index = todos.findIndex((todo) => todo.id === todoId);
    const updatedTodos = [...todos];
    updatedTodos[index].isCompleted = value;

    setTodos(updatedTodos);
  };

  const deleteHandler = (todoId: string): void => {
    const updatedTodos = todos.filter((todo) => todo.id !== todoId);

    setTodos(updatedTodos);
  };
  const updateHandler = (todoId: string, title: string): void => {
    const index = todos.findIndex((todo) => todo.id === todoId);
    const updatedTodos = [...todos];
    updatedTodos[index].title = title;

    setTodos(updatedTodos);
  };

  return (
    <Container maxWidth="sm" sx={{ height: "100vh" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography>Todo App</Typography>
        </Toolbar>
      </AppBar>
      <Stack height={"80%"} direction={"column"} spacing={"1rem"} p={"1rem"}>
        {todos.map((todo: TodoItemType) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            completeHandler={completeHandler}
            deleteHandler={deleteHandler}
            updateHandler={updateHandler}
          />
        ))}
      </Stack>
      <TextField
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        value={title}
        fullWidth
        label={"New Task"}
        onKeyDown={(e) => {
          if (e.key === "Enter" && title !== "") {
            addTodoHandler(e);
          }
        }}
      />
      <Button
        onClick={addTodoHandler}
        sx={{ margin: "0.5rem 0" }}
        variant="contained"
        fullWidth
        disabled={title === ""}
      >
        Add
      </Button>
    </Container>
  );
}

export default App;
