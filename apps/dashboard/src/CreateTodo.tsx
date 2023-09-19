import { useState } from 'react';
import { createTodo } from './service';
import { CreateTodoProps, TodoInput, TodoStatus } from './types';

const INITIAL_TODO: TodoInput = {
  title: '',
  status: false,
};

export function CreateTodo(props: CreateTodoProps) {
  const [todo, setTodo] = useState<TodoInput>(INITIAL_TODO);
  const { todoList, handleStatusFilter, updateTodoLists } = props;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newTodo = await createTodo(todo);
    const updatedTodos = [newTodo, ...todoList];

    setTodo(INITIAL_TODO);
    updateTodoLists(updatedTodos);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setTodo({
      ...todo,
      [name]: value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="row g-3">
      <div className="col-auto">
        <input
          type="text"
          name="title"
          value={todo.title}
          onChange={handleInputChange}
          className="form-control"
        />
      </div>
      <div className="col-auto">
        <button type="submit" className="btn btn-primary">
          + Add
        </button>
      </div>
      <div className="col-auto">
        <select
          name="statusFiltering"
          className="form-select"
          onChange={handleStatusFilter}
        >
          <option value="">Filter by status</option>
          <option value={TodoStatus.PENDING}>Pending</option>
          <option value={TodoStatus.COMPLETED}>Completed</option>
          <option value="">All</option>
        </select>
      </div>
    </form>
  );
}
