import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

describe('TasksController', () => {
  let controller: TasksController;

  const mockTasksService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue: mockTasksService,
        },
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return tasks from the service', async () => {
    const mockTasks = [
      {
        id: 1,
        title: 'Controller task',
        description: 'Returned from mocked service',
      },
    ];

    mockTasksService.findAll.mockResolvedValue(mockTasks);

    const result = await controller.findAll();

    expect(result).toEqual(mockTasks);
    expect(mockTasksService.findAll).toHaveBeenCalledTimes(1);
  });

  it('should create a task through the controller', async () => {
    const createTaskDto = {
      title: 'Controller task',
      description: 'Created from controller test',
    };

    const createdTask = {
      id: 1,
      ...createTaskDto,
    };

    mockTasksService.create.mockResolvedValue(createdTask);

    const result = await controller.create(createTaskDto);

    expect(result).toEqual(createdTask);
    expect(mockTasksService.create).toHaveBeenCalledWith(createTaskDto);
  });
});