import "./style.css";

interface Todo {
  title: string;
  isCompleted: boolean;
  readonly id: string;
}

let todos: Todo[] = [];

const todosContainer = document.querySelector(
  ".todoContainer"
) as HTMLDivElement;

const todoInput = document.getElementsByName("title")[0] as HTMLInputElement;

const myForm = document.getElementById("myForm") as HTMLFormElement;

myForm.onsubmit = (e: SubmitEvent) => {
  e.preventDefault();
  const todo: Todo = {
    title: todoInput.value,
    isCompleted: false,
    id: String(Math.random() * 1000 + Date.now()),
  };
  todos.push(todo);
  todoInput.value = "";
  renderTodo(todos);
};

const deleteTodo = (todoId: string) => {
  todos = todos.filter((todo) => todo.id != todoId);
  renderTodo(todos);
};

const updateTodo = (todoId: string, value: boolean) => {
  todos.forEach((todo) => {
    if (todo.id === todoId) todo.isCompleted = value;
  });
};

const generateTodoItem = (todo: Todo) => {
  const todoDiv: HTMLDivElement = document.createElement("div");
  todoDiv.className = "todo";
  // creating a checkbox
  const checkBox: HTMLInputElement = document.createElement("input");
  checkBox.setAttribute("type", "checkbox");
  checkBox.className = "isCompleted";
  checkBox.checked = todo.isCompleted;
  checkBox.onchange = (e: Event) => {
    e.preventDefault();
    updateTodo(todo.id, checkBox.checked ? true : false);
    paragraph.className = checkBox.checked ? "textCut" : "";
  };

  // creating a checkbox
  const paragraph: HTMLParagraphElement = document.createElement("p");
  paragraph.textContent = todo.title;
  paragraph.className = todo.isCompleted ? "textCut" : "";

  // Creating Delete button
  const btn: HTMLButtonElement = document.createElement("button");
  btn.innerText = "X";
  btn.className = "deleteBtn";
  btn.onclick = (e: Event) => {
    e.preventDefault();
    deleteTodo(todo.id);
  };

  // Appending All to TodoItem
  todoDiv.append(checkBox, paragraph, btn);
  todosContainer.append(todoDiv);
};

const renderTodo = (todos: Todo[]): void => {
  todosContainer.innerText = "";
  todos.forEach((todo) => {
    generateTodoItem(todo);
  });
};
