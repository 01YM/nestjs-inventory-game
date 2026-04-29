import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';

describe('TasksService', () => {
  let service: TasksService;

  const mockTaskRepository = {
    find: jest.fn(),
    findOneBy: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    count: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(Task),
          useValue: mockTaskRepository,
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all tasks', async () => {
    const mockTasks = [
      {
        id: 1,
        title: 'Test task',
        description: 'Testing task list',
      },
    ];

    mockTaskRepository.find.mockResolvedValue(mockTasks);

    const tasks = await service.findAll();

    expect(tasks).toEqual(mockTasks);
    expect(mockTaskRepository.find).toHaveBeenCalledTimes(1);
  });

  it('should create a task', async () => {
    const createTaskDto = {
      title: 'Test task',
      description: 'Testing task creation',
    };

    const createdTask = {
      id: 1,
      ...createTaskDto,
    };

    mockTaskRepository.create.mockReturnValue(createdTask);
    mockTaskRepository.save.mockResolvedValue(createdTask);

    const task = await service.create(createTaskDto);

    expect(task).toMatchObject(createdTask);
    expect(mockTaskRepository.create).toHaveBeenCalledWith(createTaskDto);
    expect(mockTaskRepository.save).toHaveBeenCalledWith(createdTask);
  });
  it('should return one task by id', async () => {
  const mockTask = {
    id: 1,
    title: 'Test task',
    description: 'Find one task',
  };

  mockTaskRepository.findOneBy.mockResolvedValue(mockTask);

  const result = await service.findOne(1);

  expect(result).toEqual(mockTask);
  expect(mockTaskRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
  });

  it('should update a task and return the updated task', async () => {
    const updateTaskDto = {
      title: 'Updated task',
      description: 'Updated description',
    };

    const updatedTask = {
      id: 1,
      ...updateTaskDto,
    };

    mockTaskRepository.update.mockResolvedValue({ affected: 1 });
    mockTaskRepository.findOneBy.mockResolvedValue(updatedTask);

    const result = await service.update(1, updateTaskDto);

    expect(result).toEqual(updatedTask);
    expect(mockTaskRepository.update).toHaveBeenCalledWith(1, updateTaskDto);
    expect(mockTaskRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
  });

  it('should remove a task when it exists', async () => {
    const mockTask = {
      id: 1,
      title: 'Task to remove',
      description: 'Remove this task',
    };

    mockTaskRepository.findOneBy.mockResolvedValue(mockTask);
    mockTaskRepository.remove.mockResolvedValue(mockTask);

    const result = await service.remove(1);

    expect(result).toEqual(mockTask);
    expect(mockTaskRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
    expect(mockTaskRepository.remove).toHaveBeenCalledWith(mockTask);
  });

  it('should return null when removing a task that does not exist', async () => {
    mockTaskRepository.findOneBy.mockResolvedValue(null);

    const result = await service.remove(999);

    expect(result).toBeNull();
    expect(mockTaskRepository.remove).not.toHaveBeenCalled();
  });

  it('should seed sample data when task count is zero', async () => {
    mockTaskRepository.count.mockResolvedValue(0);

    const sampleTasks = [
      { title: 'Clean the room', completed: false, description: 'Put away clothes and tidy the floor' },
      { title: 'Organize the inventory', completed: true, description: 'Sort all game items into categories' },
      { title: 'Restock shelves', completed: false, description: 'Add missing items to the shelf list' },
    ];

    mockTaskRepository.create.mockReturnValue(sampleTasks);
    mockTaskRepository.save.mockResolvedValue(sampleTasks);

    await service.seedSampleData();

    expect(mockTaskRepository.count).toHaveBeenCalledTimes(1);
    expect(mockTaskRepository.create).toHaveBeenCalled();
    expect(mockTaskRepository.save).toHaveBeenCalledWith(sampleTasks);
  });

  it('should not seed sample data when tasks already exist', async () => {
    mockTaskRepository.count.mockResolvedValue(3);

    await service.seedSampleData();

    expect(mockTaskRepository.count).toHaveBeenCalledTimes(1);
    expect(mockTaskRepository.create).not.toHaveBeenCalled();
    expect(mockTaskRepository.save).not.toHaveBeenCalled();
  });
});