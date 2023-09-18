import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { TodoService } from './todo.service';
import { Todo } from './entity/Todo.entity';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  getTodoList(): Promise<Todo[]> {
    return this.todoService.getTodoList();
  }

  @Post()
  createTodo(@Body() createTodoDto: CreateTodoDto): Promise<Todo> {
    return this.todoService.createTodo(createTodoDto);
  }

  @Put(':id')
  async updateTodo(
    @Param('id') id: string,
    @Body('status') status: boolean
  ): Promise<void> {
    await this.todoService.updateTodo(id, status);
  }

  @Delete(':id')
  async deleteTodo(@Param('id') id: string): Promise<void> {
    await this.todoService.deleteTodo(id);
  }
}
