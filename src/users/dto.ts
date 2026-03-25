import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'zhangsan', minLength: 3, maxLength: 64 })
  username: string;

  @ApiProperty({ example: 'zhangsan@example.com' })
  email: string;

  @ApiProperty({ minLength: 32, description: '密码哈希' })
  passwordHash: string;

  @ApiPropertyOptional({ type: [String], example: ['user'] })
  roles?: string[];

  @ApiPropertyOptional({ example: true })
  isActive?: boolean;

  @ApiPropertyOptional({ example: '张三' })
  displayName?: string;
}

export class UpdateUserDto {
  @ApiPropertyOptional({ minLength: 3, maxLength: 64 })
  username?: string;

  @ApiPropertyOptional()
  email?: string;

  @ApiPropertyOptional({ minLength: 32, description: '密码哈希' })
  passwordHash?: string;

  @ApiPropertyOptional({ type: [String] })
  roles?: string[];

  @ApiPropertyOptional()
  isActive?: boolean;

  @ApiPropertyOptional()
  displayName?: string;
}
