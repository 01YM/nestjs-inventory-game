import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './item.entity';
import { ItemsService } from './items.service';

describe('ItemsService', () => {
  let service: ItemsService;
  let repository: jest.Mocked<Repository<Item>>;

  const mockItems = [
    { id: 1, name: 'Potion', quantity: 5 },
    { id: 2, name: 'Sword', quantity: 1 },
  ];

  const mockItemRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItemsService,
        {
          provide: getRepositoryToken(Item),
          useValue: mockItemRepository,
        },
      ],
    }).compile();

    service = module.get<ItemsService>(ItemsService);
    repository = module.get(getRepositoryToken(Item));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return all items from the mocked repository', async () => {
    repository.find.mockResolvedValue(mockItems as Item[]);

    const result = await service.findAll();

    expect(result).toEqual(mockItems);
    expect(repository.find).toHaveBeenCalledTimes(1);
  });

  it('should return one item from the mocked repository', async () => {
    repository.findOne.mockResolvedValue(mockItems[0] as Item);

    const result = await service.findOne(1);

    expect(result).toEqual(mockItems[0]);
    expect(repository.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });
});