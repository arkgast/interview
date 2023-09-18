import { ListTodoProps } from './types';

export function ListTodo(props: ListTodoProps) {
  const { filteredTodoList, handleDeleteTodo, handleUpdateTodo } = props;

  return (
    <>
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
