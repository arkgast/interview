import { useEffect, useState } from 'react';
import { CreateTodo } from './CreateTodo';
import { ListTodo } from './ListTodo';
import {
  createTodo,
  deleteTodo,
  getTodoList,
  updateTodoStatus,
} from './service';
import { Todo, TodoInput } from './types';

const emptyTodo: TodoInput = {
  title: '',
  status: false,
};

export function App() {
  const [todo, setTodo] = useState<TodoInput>(emptyTodo);
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [filteredTodoList, setFilteredTodoList] = useState<Todo[]>([]);

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
        <CreateTodo
          todo={todo}
          handleSubmit={handleSubmit}
          handleInputChange={handleInputChange}
          handleStatusFilter={handleStatusFilter}
        />
      </div>

      <div>
        <ListTodo
          filteredTodoList={filteredTodoList}
          handleDeleteTodo={handleDeleteTodo}
          handleUpdateTodo={handleUpdateTodo}
        />
      </div>
    </div>
  );
}
