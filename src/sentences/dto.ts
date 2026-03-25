import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSentenceDto {
  @ApiProperty({ description: '话题ID(ObjectId字符串)' })
  topicId: string;

  @ApiProperty({ example: '嗨，刚看到你的笑容，感觉今天的心情都被点亮了。' })
  sentence: string;

  @ApiPropertyOptional({ example: '轻松开场，氛围友好自然' })
  description?: string;

  @ApiPropertyOptional({ example: true })
  isActive?: boolean;
}

export class UpdateSentenceDto {
  @ApiPropertyOptional({ description: '话题ID(ObjectId字符串)' })
  topicId?: string;

  @ApiPropertyOptional()
  sentence?: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiPropertyOptional()
  isActive?: boolean;
}
