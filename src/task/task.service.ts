import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.schema';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<Task>,
  ) {}
  create(createTaskDto: CreateTaskDto) {
    const task = new this.taskModel(createTaskDto);
    if (!task) {
      throw new NotFoundException(`Task not created`);
    }
    return task.save();
  }
}
