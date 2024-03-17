import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class TransactionCreateDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  amount: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  unitPrice: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  cryptoId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  purchaseId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  orderId: number;
}
