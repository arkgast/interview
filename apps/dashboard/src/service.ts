import axios from 'axios';
import { Todo, CreateTodo } from './types';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

async function getTodoList() {
  try {
    const { data } = await api.get('/todo');
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function createTodo(todo: CreateTodo) {
  try {
    const { data } = await api.post('/todo', todo);
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function updateTodoStatus(id: string, status: boolean) {
  try {
    const { data } = await api.put(`/todo/${id}`, { status });
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function deleteTodo(id: string) {
  try {
    const { data } = await api.delete(`/todo/${id}`);
    return data;
  } catch (error) {
    console.error(error);
  }
}

export { getTodoList, createTodo, updateTodoStatus, deleteTodo };
