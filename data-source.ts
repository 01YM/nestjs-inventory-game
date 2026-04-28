import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Task } from './src/tasks/task.entity';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'postgres',
  password: 'postgres',
  database: 'nestdb',
  entities: [Task],
  migrations: ['src/migrations/*.ts'],
});