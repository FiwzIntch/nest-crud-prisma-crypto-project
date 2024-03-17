import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class TransferCreateDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  amount: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  cryptoId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  fromUserId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  toUserId: number;
}
