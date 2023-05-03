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
  findAll() {
    const tasks = this.taskModel.find().exec();
    if (!tasks) {
      throw new NotFoundException(`Tasks not found`);
    }
    return tasks;
  }
  async findOne(id: string) {
    const task = await this.taskModel.findOne({ _id: id }).exec();
    if (!task) {
      throw new NotFoundException(`Task ${id} not found`);
    }
    return task;
  }
}
