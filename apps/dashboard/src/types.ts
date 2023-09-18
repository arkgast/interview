export type Todo = {
  id: string;
  title: string;
  status: boolean;
  deleted?: boolean;
};

export type CreateTodo = Omit<Todo, 'id'>;
