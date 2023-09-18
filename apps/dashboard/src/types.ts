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
  todo: TodoInput;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleStatusFilter: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

export type ListTodoProps = {
  filteredTodoList: Todo[];
  handleDeleteTodo: (id: string) => void;
  handleUpdateTodo: (todoId: string, todoStatus: boolean) => void;
};
