import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';
import { TransferCreateDto } from './transfer-create.dto';

export class TransferUpdateDto extends PartialType(TransferCreateDto) {
  @IsNumber()
  @IsOptional()
  @ApiProperty({
    required: false,
  })
  id?: number;
}
