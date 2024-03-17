import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';
import { UserCryptocurrencyCreateDto } from './user-cryptocurrency-create.dto';

export class UserCryptocurrencyUpdateDto extends PartialType(
  UserCryptocurrencyCreateDto,
) {
  @IsNumber()
  @IsOptional()
  @ApiProperty({
    required: false,
  })
  id?: number;
}
