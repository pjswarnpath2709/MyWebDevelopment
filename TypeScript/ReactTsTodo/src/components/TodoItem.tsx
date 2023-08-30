import {
  Paper,
  Typography,
  Checkbox,
  Button,
  Stack,
  TextField,
} from "@mui/material";
import { Delete, Edit, Done } from "@mui/icons-material";
import { useState } from "react";

type TodoItemPropType = {
  todo: TodoItemType;
  completeHandler: (todoId: string, value: boolean) => void;
  deleteHandler: (todoId: string) => void;
  updateHandler: (todoId: string, title: string) => void;
};

const TodoItem = ({
  todo,
  completeHandler,
  deleteHandler,
  updateHandler,
}: TodoItemPropType) => {
  const [editActive, setEditActive] = useState<boolean>(false);
  const [check, setCheck] = useState<boolean>(todo.isCompleted);
  const [textVal, setTextVal] = useState<string>(todo.title);
  const toggleCheckBoxHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    completeHandler(todo.id, e.target.checked);
    setCheck(e.target.checked);
  };
  return (
    <Paper sx={{ padding: "1rem" }} variant="elevation">
      <Stack height={"100%"} direction={"row"} alignItems={"center"}>
        {editActive ? (
          <TextField
            fullWidth
            value={textVal}
            onKeyDown={(e) => {
              if (e.key === "Enter" && textVal !== "") {
                updateHandler(todo.id, textVal);
                setEditActive(false);
              }
            }}
            onChange={(e) => {
              setTextVal(e.target.value);
            }}
          />
        ) : (
          <Typography marginRight={"auto"}>{todo.title}</Typography>
        )}

        <Checkbox onChange={toggleCheckBoxHandler} checked={check} />
        <Button
          onClick={(e) => {
            e.preventDefault();
            deleteHandler(todo.id);
          }}
          sx={{ opacity: 600, color: "black" }}
        >
          <Delete color="warning" />
        </Button>
        {editActive === false ? (
          <Button
            onClick={() => {
              setEditActive(true);
            }}
            sx={{ fontWeight: 600 }}
          >
            <Edit color="secondary" />
          </Button>
        ) : (
          <Button
            onClick={() => {
              setEditActive(false);
              updateHandler(todo.id, textVal);
            }}
            sx={{ fontWeight: 600 }}
          >
            <Done />
          </Button>
        )}
      </Stack>
    </Paper>
  );
};

export default TodoItem;
