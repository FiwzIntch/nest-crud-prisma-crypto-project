import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';
import { UserCreateDto } from './user-create.dto';

export class UserUpdateDto extends PartialType(UserCreateDto) {
  @IsNumber()
  @IsOptional()
  @ApiProperty({
    required: false,
  })
  id?: number;
}
