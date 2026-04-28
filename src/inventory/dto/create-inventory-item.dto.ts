import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateInventoryItemDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @Min(1)
  quantity: number;
}