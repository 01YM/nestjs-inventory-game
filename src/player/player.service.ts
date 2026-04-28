import { Injectable } from '@nestjs/common';

@Injectable()
export class PlayerService {
  getPlayer() {
    return {
      name: 'Hero',
      level: 5,
      health: 100,
      gold: 50,
    };
  }
}