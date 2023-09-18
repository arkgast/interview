import { CreateTodoProps, TodoStatus } from './types';

export function CreateTodo(props: CreateTodoProps) {
  const { todo, handleSubmit, handleInputChange, handleStatusFilter } = props;
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
  );
}
