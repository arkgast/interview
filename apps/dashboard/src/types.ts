export type Todo = {
  id: string;
  title: string;
  status: boolean;
  deleted?: boolean;
};

export type TodoInput = Omit<Todo, 'id'>;

export enum TodoStatus {
  PENDING = 0,
  COMPLETED = 1,
}

export type CreateTodoProps = {
  todoList: Todo[];
  handleStatusFilter: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  updateTodoLists: (todoList: Todo[]) => void;
};

export type ListTodoProps = {
  todoList: Todo[];
  filteredTodoList: Todo[];
  updateTodoLists: (todoList: Todo[]) => void;
};
