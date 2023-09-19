import axios from 'axios';
import { Todo, TodoInput, UpdateTodoInput } from './types';

const API_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
});

async function getTodoList(): Promise<Todo[]> {
  try {
    const { data } = await api.get<Todo[]>('/todo');
    return data;
  } catch (error) {
    throw new Error(`Error while fetching todo list: ${error}`);
  }
}

async function createTodo(todo: TodoInput): Promise<Todo> {
  try {
    const { data } = await api.post<Todo>('/todo', todo);
    return data;
  } catch (error) {
    throw new Error(`Error while creating todo: ${error}`);
  }
}

async function updateTodo(
  id: Todo['id'],
  updateTodo: UpdateTodoInput
): Promise<void> {
  try {
    await api.put(`/todo/${id}`, updateTodo);
  } catch (error) {
    throw new Error(`Error while updating todo status: ${error}`);
  }
}

async function deleteTodo(id: Todo['id']): Promise<void> {
  try {
    await api.delete(`/todo/${id}`);
  } catch (error) {
    throw new Error(`Error while deleting todo: ${error}`);
  }
}

export { createTodo, deleteTodo, getTodoList, updateTodo };
