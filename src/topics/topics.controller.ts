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
import { TopicsService } from './topics.service';
import type { CreateTopicDto, UpdateTopicDto } from './dto';
import { NotFoundException } from '@nestjs/common';
import { IdParamPipe } from '../common/pipes/user.pipes';
import {
  CreateTopicPipe,
  UpdateTopicPipe,
} from '../common/pipes/taxonomy.pipes';

@ApiTags('topics')
@Controller('topics')
export class TopicsController {
  constructor(private readonly topics: TopicsService) {}
  @ApiOperation({ summary: '创建话题' })
  @Post()
  create(@Body(new CreateTopicPipe()) dto: CreateTopicDto) {
    return this.topics.create(dto);
  }
  @ApiOperation({ summary: '获取话题列表' })
  @Get()
  findAll() {
    return this.topics.findAll();
  }
  @ApiOperation({ summary: '获取话题详情' })
  @Get(':id')
  async findOne(@Param('id', new IdParamPipe()) id: string) {
    const t = await this.topics.findOne(id);
    if (!t)
      throw new NotFoundException({
        message: 'topic not found',
        error: 'NotFound',
      });
    return t;
  }
  @ApiOperation({ summary: '更新话题' })
  @Patch(':id')
  async update(
    @Param('id', new IdParamPipe()) id: string,
    @Body(new UpdateTopicPipe()) dto: UpdateTopicDto,
  ) {
    const t = await this.topics.update(id, dto);
    if (!t)
      throw new NotFoundException({
        message: 'topic not found',
        error: 'NotFound',
      });
    return t;
  }
  @ApiOperation({ summary: '删除话题' })
  @Delete(':id')
  async remove(@Param('id', new IdParamPipe()) id: string) {
    const res = await this.topics.remove(id);
    if (!res.deleted)
      throw new NotFoundException({
        message: 'topic not found',
        error: 'NotFound',
      });
    return res;
  }
}
