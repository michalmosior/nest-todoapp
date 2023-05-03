import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

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
  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const existingTask = await this.taskModel
      .findOneAndUpdate({ _id: id }, { $set: updateTaskDto }, { new: true })
      .exec();
    if (!existingTask) {
      throw new NotFoundException(`Task #${id} not found`);
    }
    return existingTask;
  }
}
