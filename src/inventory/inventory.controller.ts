import { Body, Controller, Get, Headers, Post, UnauthorizedException } from '@nestjs/common';
import { CreateInventoryItemDto } from './dto/create-inventory-item.dto';
import { InventoryService } from './inventory.service';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get()
  getItems() {
    return this.inventoryService.getItems();
  }

  @Post()
  createItem(@Body() createItemDto: CreateInventoryItemDto) {
    return {
      message: 'Item created',
      item: createItemDto,
    };
  }

  @Get('protected')
  getProtectedItems(@Headers('authorization') authorization: string) {
    if (authorization !== 'Bearer test-jwt-token') {
      throw new UnauthorizedException();
    }

    return {
      message: 'Access granted',
    };
  }
}