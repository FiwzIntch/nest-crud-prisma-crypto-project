import { ApiProperty } from '@nestjs/swagger';
import { Status } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';

export class PurchaseOrderCreateDto {
  @IsEnum(Status)
  @IsNotEmpty()
  @ApiProperty({
    enum: Status,
    default: Status.PENDING,
  })
  status: Status;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  paidAmount: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  cryptoId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  userId: number;
}
