export const saveLocal = (todos: TodoItemType[]) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

export const getLocal = (): TodoItemType[] => {
  const item: string | null = localStorage.getItem("todos");
  if (item === null) return [];
  return JSON.parse(item);
};
