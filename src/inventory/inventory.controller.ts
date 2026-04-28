import { Controller, Get } from '@nestjs/common';
import { InventoryService } from './inventory.service';

@Controller('inventory')
export class InventoryController {
  constructor(private inventoryService: InventoryService) {}

  @Get()
  findAll(): string[] {
    return this.inventoryService.getItems();
  }
  @Get()
  getItems() {
    return this.inventoryService.getItems();
  }
}