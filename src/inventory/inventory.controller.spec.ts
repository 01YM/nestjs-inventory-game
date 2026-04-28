import { Test, TestingModule } from '@nestjs/testing';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';

describe('InventoryController', () => {
  let controller: InventoryController;

  const mockInventoryService = {
    getItems: jest.fn().mockReturnValue([
      { id: 1, name: 'Potion', quantity: 5 },
      { id: 2, name: 'Sword', quantity: 1 },
    ]),
    getItemCount: jest.fn().mockReturnValue(2),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InventoryController],
      providers: [
        {
          provide: InventoryService,
          useValue: mockInventoryService,
        },
      ],
    }).compile();

    controller = module.get<InventoryController>(InventoryController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return inventory items from the mocked service', () => {
    const result = controller.getItems();

    expect(result).toEqual([
      { id: 1, name: 'Potion', quantity: 5 },
      { id: 2, name: 'Sword', quantity: 1 },
    ]);

    expect(mockInventoryService.getItems).toHaveBeenCalledTimes(1);
  });
});