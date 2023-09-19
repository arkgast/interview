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

const INITIAL_TODO: TodoInput = {
  title: '',
  status: false,
};

export function App() {
  const [todo, setTodo] = useState<TodoInput>(INITIAL_TODO);
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [filteredTodoList, setFilteredTodoList] = useState<Todo[]>([]);

  useEffect(() => {
    getTodoList().then((todos) => {
      setTodoList(todos);
      setFilteredTodoList(todos);
    });
  }, []);

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

  const handleDeleteTodo = (id: string) => {
    deleteTodo(id).then(() => {
      const updatedTodos = todoList.filter((todo) => todo.id !== id);
      updateTodoLists(updatedTodos);
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

      updateTodoLists(updatedTodoList);
    });
  };

  const updateTodoLists = (todos: Todo[]) => {
    setTodoList(todos);
    setFilteredTodoList(todos);
  };

  const handleStatusFilter = (event: React.FormEvent<HTMLSelectElement>) => {
    const { value } = event.currentTarget;
    filterByTodoStatus(value);
  };

  const filterByTodoStatus = (value: string) => {
    const isAll = value === '';
    const filterdStatus = parseInt(value, 10);

    const filteredTodos = todoList.filter(
      (todo) => isAll || todo.status === Boolean(filterdStatus)
    );
    setFilteredTodoList(filteredTodos);
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
