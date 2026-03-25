import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import type { CreateUserDto, UpdateUserDto } from './dto';
import { NotFoundException } from '@nestjs/common';
import {
  CreateUserPipe,
  IdParamPipe,
  UpdateUserPipe,
} from '../common/pipes/user.pipes';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly users: UsersService) {}
  @ApiOperation({ summary: '创建用户' })
  @Post()
  create(@Body(new CreateUserPipe()) dto: CreateUserDto) {
    return this.users.create(dto);
  }
  @ApiOperation({ summary: '获取用户列表' })
  @Get()
  findAll() {
    return this.users.findAll();
  }
  @ApiOperation({ summary: '获取用户详情' })
  @Get(':id')
  async findOne(@Param('id', new IdParamPipe()) id: string) {
    const user = await this.users.findOne(id);
    if (!user)
      throw new NotFoundException({
        message: 'user not found',
        error: 'NotFound',
      });
    return user;
  }
  @ApiOperation({ summary: '更新用户' })
  @Patch(':id')
  async update(
    @Param('id', new IdParamPipe()) id: string,
    @Body(new UpdateUserPipe()) dto: UpdateUserDto,
  ) {
    const user = await this.users.update(id, dto);
    if (!user)
      throw new NotFoundException({
        message: 'user not found',
        error: 'NotFound',
      });
    return user;
  }
  @ApiOperation({ summary: '删除用户' })
  @Delete(':id')
  async remove(@Param('id', new IdParamPipe()) id: string) {
    const res = await this.users.remove(id);
    if (!res.deleted)
      throw new NotFoundException({
        message: 'user not found',
        error: 'NotFound',
      });
    return res;
  }
}
