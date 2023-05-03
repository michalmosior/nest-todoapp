import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
    constructor(private taskService: TaskService) {}
    @Post()
    create(@Body() createTaskDto: CreateTaskDto) {
      return this.taskService.create(createTaskDto);
    }
    @Get()
    findAll() {
      return this.taskService.findAll();
    }
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.taskService.findOne(id);
    }
}
