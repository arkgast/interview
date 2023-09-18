import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { Todo } from './entity/Todo.entity';

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
    });
  }

  createTodo(todo: CreateTodoDto) {
    return this.todoRepository.save(todo);
  }

  deleteTodo(id: string) {
    return this.todoRepository.update(id, { deleted: true });
  }

  updateTodo(id: string, status: boolean) {
    return this.todoRepository.update(id, { status });
  }
}
