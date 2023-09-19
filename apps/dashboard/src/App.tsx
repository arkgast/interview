import { useState } from 'react';
import { CreateTodo } from './components/CreateTodo';
import { ListTodo } from './components/ListTodo';
import { Todo } from './types';

export function App() {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [filteredTodoList, setFilteredTodoList] = useState<Todo[]>([]);

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
          todoList={todoList}
          handleStatusFilter={handleStatusFilter}
          updateTodoLists={updateTodoLists}
        />
      </div>

      <div>
        <ListTodo
          todoList={todoList}
          filteredTodoList={filteredTodoList}
          updateTodoLists={updateTodoLists}
        />
      </div>
    </div>
  );
}
