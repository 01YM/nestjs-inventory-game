import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  findAll() {
    return this.taskRepository.find();
  }

  findOne(id: number) {
    return this.taskRepository.findOneBy({ id });
  }

  async create(task: CreateTaskDto) {
    const newTask = this.taskRepository.create(task);
    return await this.taskRepository.save(newTask);
  }

  async update(id: number, updatedTask: CreateTaskDto) {
    await this.taskRepository.update(id, updatedTask);
    return this.taskRepository.findOneBy({ id });
  }

  async remove(id: number) {
    const task = await this.taskRepository.findOneBy({ id });
    if (task) {
      await this.taskRepository.remove(task);
    }
    return task;
  }

  async seedSampleData() {
    const count = await this.taskRepository.count();

    if (count === 0) {
      const sampleTasks = this.taskRepository.create([
        {
          title: 'Clean the room',
          completed: false,
          description: 'Put away clothes and tidy the floor',
        },
        {
          title: 'Organize the inventory',
          completed: true,
          description: 'Sort all game items into categories',
        },
        {
          title: 'Restock shelves',
          completed: false,
          description: 'Add missing items to the shelf list',
        },
      ]);

      await this.taskRepository.save(sampleTasks);
    }
  }
}