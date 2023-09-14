import { Controller, Get, Param, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): string {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    return this.userService.findOne(id);
  }
}