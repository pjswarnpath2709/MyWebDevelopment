import { ReactNode, createContext, useState, useContext } from "react";

export type TodoProviderProps = {
  children: ReactNode;
};

export type Todo = {
  id: string;
  task: string;
  isCompleted: boolean;
  createdAt: Date;
};

export type TodosContextType = {
  todos: Todo[];
  handleAddToDo: (task: string) => void;
  toggleTodoAsCompleted: (id: string) => void;
  handleDeleteTodo: (id: string) => void;
  updateLocalStorage: (newTodos: Todo[]) => void;
};

export const TodosContext = createContext<TodosContextType | null>(null);

export const TodoProvider = ({ children }: TodoProviderProps) => {
  const getID = (): string => (Math.random() + new Date().getTime()).toString();
  const [todos, setTodos] = useState<Todo[]>(() => {
    try {
      const newTodos: Todo[] =
        (JSON.parse(localStorage.getItem("todos") as string) as Todo[]) || [];
      return newTodos;
    } catch (error) {
      return [];
    }
  });

  const updateLocalStorage = (newTodos: Todo[]): void => {
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };
  const handleAddToDo = (task: string): void => {
    setTodos((prev) => {
      const newTodos: Todo[] = [
        {
          id: getID(),
          task: task,
          isCompleted: false,
          createdAt: new Date(),
        },
        ...prev,
      ];
      updateLocalStorage(newTodos);
      return newTodos;
    });
  };
  const toggleTodoAsCompleted = (id: string): void => {
    setTodos((prev: Todo[]) => {
      const newTodos: Todo[] = prev.map((todo: Todo) => {
        if (todo.id === id) {
          return { ...todo, isCompleted: true };
        }
        return todo;
      });
      updateLocalStorage(newTodos);
      return newTodos;
    });
  };
  const handleDeleteTodo = (id: string): void => {
    setTodos((prev: Todo[]) => {
      const newTodos: Todo[] = prev.filter((todo: Todo) => todo.id !== id);
      updateLocalStorage(newTodos);
      return newTodos;
    });
  };

  return (
    <TodosContext.Provider
      value={{
        todos,
        handleAddToDo,
        toggleTodoAsCompleted,
        handleDeleteTodo,
        updateLocalStorage,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};

// consumer
export const useTodos = () => {
  const todosConsumer = useContext(TodosContext);
  if (!todosConsumer) {
    throw new Error("usedTodos used outside the provider");
  }
  return todosConsumer;
};
