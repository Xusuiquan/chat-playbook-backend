import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ example: '撩妹开场', minLength: 1, maxLength: 64 })
  name: string;

  @ApiProperty({ example: 'kaichang', minLength: 1, maxLength: 64 })
  slug: string;

  @ApiPropertyOptional({ example: '自然不尴尬的聊天开场分类' })
  description?: string;
}

export class UpdateCategoryDto {
  @ApiPropertyOptional({ minLength: 1, maxLength: 64 })
  name?: string;

  @ApiPropertyOptional({ minLength: 1, maxLength: 64 })
  slug?: string;

  @ApiPropertyOptional()
  description?: string;
}
