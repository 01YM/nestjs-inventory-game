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

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return inventory items from the service', () => {
    expect(controller.getItems()).toEqual([
      { id: 1, name: 'Potion', quantity: 5 },
      { id: 2, name: 'Sword', quantity: 1 },
    ]);

    expect(mockInventoryService.getItems).toHaveBeenCalled();
  });
});