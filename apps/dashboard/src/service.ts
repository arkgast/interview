import axios from 'axios';
import { Todo, CreateTodo } from './types';

const API_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
});

async function getTodoList(): Promise<Todo[]> {
  try {
    const { data } = await api.get<Todo[]>('/todo');
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(`Error while fetching todo list: ${error}`);
  }
}

async function createTodo(todo: CreateTodo): Promise<Todo> {
  try {
    const { data } = await api.post<Todo>('/todo', todo);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(`Error while creating todo: ${error}`);
  }
}

async function updateTodoStatus(
  id: Todo['id'],
  status: Todo['status']
): Promise<Todo> {
  try {
    const { data } = await api.put(`/todo/${id}`, { status });
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(`Error while updating todo status: ${error}`);
  }
}

async function deleteTodo(id: Todo['id']): Promise<void> {
  try {
    await api.delete(`/todo/${id}`);
  } catch (error) {
    console.error(error);
    throw new Error(`Error while deleting todo: ${error}`);
  }
}

export { getTodoList, createTodo, updateTodoStatus, deleteTodo };
