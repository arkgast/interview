import { useEffect } from 'react';
import { ListTodoProps } from '../types';
import { getTodoList, deleteTodo, updateTodoStatus } from '../services';

export function ListTodo(props: ListTodoProps) {
  const { filteredTodoList, todoList, updateTodoLists } = props;

  useEffect(() => {
    const fetchTodoList = async () => {
      const todos = await getTodoList();
      updateTodoLists(todos);
    };

    fetchTodoList();
  }, [updateTodoLists]);

  const handleDeleteTodo = async (id: string) => {
    await deleteTodo(id);
    const updatedTodos = todoList.filter((todo) => todo.id !== id);
    updateTodoLists(updatedTodos);
  };

  const handleUpdateTodo = async (todoId: string, todoStatus: boolean) => {
    await updateTodoStatus(todoId, !todoStatus);
    const updatedTodoList = todoList.map((todo) => {
      if (todo.id === todoId) {
        return { ...todo, status: !todoStatus };
      }
      return todo;
    });

    updateTodoLists(updatedTodoList);
  };

  return (
    <>
      {filteredTodoList.length === 0 && (
        <div className="alert alert-info" role="alert">
          No tasks found
        </div>
      )}
      <ul className="list-group">
        {filteredTodoList.map((todo) => {
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
                  className={todo.status ? 'text-decoration-line-through' : ''}
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
    </>
  );
}
