import { useEffect, useState } from 'react';
import { CreateTodo, Todo } from './types';
import {
  getTodoList,
  createTodo,
  updateTodoStatus,
  deleteTodo,
} from './service';

const emptyTodo: CreateTodo = {
  title: '',
  status: false,
};

enum TodoStatus {
  PENDING = 0,
  COMPLETED = 1,
}

export function App() {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [filteredTodoList, setFilteredTodoList] = useState<Todo[]>([]);
  const [todo, setTodo] = useState<CreateTodo>(emptyTodo);

  useEffect(() => {
    getTodoList().then((todos) => {
      setTodoList(todos);
      setFilteredTodoList(todos);
    });
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    createTodo(todo).then((todo) => {
      setTodo(emptyTodo);
      setTodoList([...todoList, todo]);
      setFilteredTodoList([...todoList, todo]);
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setTodo({
      ...todo,
      [name]: value,
    });
  };

  const handleDeleteTodo = (id: string) => {
    deleteTodo(id).then(() => {
      const updatedTodoList = todoList.filter((todo) => todo.id !== id);
      setTodoList(updatedTodoList);
      setFilteredTodoList(updatedTodoList);
    });
  };

  const handleUpdateTodo = (todoId: string, todoStatus: boolean) => {
    updateTodoStatus(todoId, !todoStatus).then(() => {
      const updatedTodoList = todoList.map((todo) => {
        if (todo.id === todoId) {
          return { ...todo, status: !todoStatus };
        }
        return todo;
      });

      setTodoList(updatedTodoList);
      setFilteredTodoList(updatedTodoList);
    });
  };

  const handleStatusFilter = (event: React.FormEvent<HTMLSelectElement>) => {
    const { value } = event.currentTarget;
    setFilteredTodoList(
      todoList.filter((todo) => {
        if (value === '') {
          return true;
        }

        const filterdStatus = parseInt(value, 10);
        return todo.status === Boolean(filterdStatus);
      })
    );
  };

  return (
    <div className="mx-4 mt-3">
      <h1>Tasks ({filteredTodoList.length})</h1>

      <div className="mb-3">
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
              Save
            </button>
          </div>
          <div className="col-auto">
            <select
              name="statusFiltering"
              className="form-select"
              onChange={handleStatusFilter}
            >
              <option defaultValue="" value="">
                Filter by status
              </option>
              <option value={TodoStatus.PENDING}>Pending</option>
              <option value={TodoStatus.COMPLETED}>Completed</option>
              <option value="">All</option>
            </select>
          </div>
        </form>
      </div>
      <div>
        {filteredTodoList.length === 0 && (
          <div className="alert alert-info" role="alert">
            No tasks found
          </div>
        )}
        <ul className="list-group">
          {filteredTodoList.map((todo) => {
            console.log(todo.status);
            return (
              <div
                key={todo.id}
                className="d-flex justify-content-between align-items-center mb-2"
              >
                <li
                  className="list-group-item cursor-hand w-100"
                  onClick={() => handleUpdateTodo(todo.id, todo.status)}
                >
                  <span
                    className={
                      todo.status ? 'text-decoration-line-through' : ''
                    }
                  >
                    {todo.title}
                  </span>
                </li>
                <button
                  type="button"
                  onClick={() => handleDeleteTodo(todo.id)}
                  className="rounded-end btn btn-danger rounded-0 py-2"
                >
                  X
                </button>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
