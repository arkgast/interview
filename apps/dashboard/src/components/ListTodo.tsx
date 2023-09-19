import { useEffect } from 'react';
import { deleteTodo, getTodoList, updateTodo } from '../services';
import { ListTodoProps, TodoInput, UpdateTodoInput } from '../types';

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

  const handleUpdateTodoStatus = async (
    todoId: string,
    { status }: TodoInput
  ) => {
    await executeUpdateTodo(todoId, { status: !status });
  };

  const handleUpdateTodoTitle = async (
    todoId: string,
    { title }: TodoInput
  ) => {
    const newTitle = prompt('Update todo title', title);
    if (title === newTitle || !newTitle) return;

    await executeUpdateTodo(todoId, { title: newTitle || title });
  };

  const executeUpdateTodo = async (todoId: string, todo: UpdateTodoInput) => {
    await updateTodo(todoId, todo);

    const updatedTodoList = todoList.map((todoItem) => {
      if (todoItem.id === todoId) {
        return { ...todoItem, ...todo };
      }
      return todoItem;
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
                onClick={() => handleUpdateTodoStatus(todo.id, todo)}
              >
                <span
                  className={todo.status ? 'text-decoration-line-through' : ''}
                >
                  {todo.title}
                </span>
              </li>
              <div className="btn-group">
                <button
                  type="button"
                  className="btn btn-secondary rounded-0"
                  onClick={() => handleUpdateTodoTitle(todo.id, todo)}
                >
                  <i className="bi bi-pencil-square"></i>
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteTodo(todo.id)}
                  className="btn btn-danger py-2"
                >
                  <i className="bi bi-trash"></i>
                </button>
              </div>
            </div>
          );
        })}
      </ul>
    </>
  );
}
