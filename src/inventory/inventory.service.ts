import { Injectable } from '@nestjs/common';

@Injectable()
export class InventoryService {
  getItems(): string[] {
    return ['Sword', 'Shield', 'Potion'];
  }
  getItemCount(): number {
  return this.getItems().length;
}
}