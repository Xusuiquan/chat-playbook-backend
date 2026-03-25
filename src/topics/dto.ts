import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTopicDto {
  @ApiProperty({ description: '分类ID(ObjectId字符串)' })
  categoryId: string;

  @ApiProperty({ example: '第一次聊天开场', minLength: 1, maxLength: 128 })
  title: string;

  @ApiPropertyOptional({ type: [String], example: ['开场', '幽默', '轻松'] })
  tags?: string[];

  @ApiPropertyOptional({ example: '自然不尴尬的破冰方式' })
  description?: string;

  @ApiPropertyOptional({ example: true })
  isActive?: boolean;
}

export class UpdateTopicDto {
  @ApiPropertyOptional({ description: '分类ID(ObjectId字符串)' })
  categoryId?: string;

  @ApiPropertyOptional({ minLength: 1, maxLength: 128 })
  title?: string;

  @ApiPropertyOptional({ type: [String] })
  tags?: string[];

  @ApiPropertyOptional()
  description?: string;

  @ApiPropertyOptional()
  isActive?: boolean;
}
