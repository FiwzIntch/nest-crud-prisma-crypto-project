import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
import { transformIntOptional } from 'src/transform/base';

export class FindManyQuery {
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Transform((value) => transformIntOptional(value))
  page?: number;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Transform((value) => transformIntOptional(value))
  pageSize?: number;

  @ApiProperty({
    required: false,
    description:
      'https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#where for more detail',
  })
  @IsOptional()
  where?: string;
}
