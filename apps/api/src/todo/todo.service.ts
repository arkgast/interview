import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { Todo } from './entity/Todo.entity';
import { UpdateTodoDto } from './dtos/update-todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private todoRepository: Repository<Todo>
  ) {}

  getTodoList(): Promise<Todo[]> {
    return this.todoRepository.find({
      where: {
        deleted: false,
      },
      order: {
        id: 'DESC',
      },
    });
  }

  createTodo(todo: CreateTodoDto): Promise<Todo> {
    return this.todoRepository.save(todo);
  }

  async updateTodo(id: string, updateTodoDto: UpdateTodoDto): Promise<void> {
    await this.todoRepository.update(id, updateTodoDto);
  }

  async deleteTodo(id: string): Promise<void> {
    await this.todoRepository.update(id, { deleted: true });
  }
}
