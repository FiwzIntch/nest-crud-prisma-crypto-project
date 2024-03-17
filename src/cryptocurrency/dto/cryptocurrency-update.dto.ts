import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';
import { CryptocurrencyCreateDto } from './cryptocurrency-create.dto';

export class CryptocurrencyUpdateDto extends PartialType(
  CryptocurrencyCreateDto,
) {
  @IsNumber()
  @IsOptional()
  @ApiProperty({
    required: false,
  })
  id?: number;
}
