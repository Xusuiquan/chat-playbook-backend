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
import { SentencesService } from './sentences.service';
import type { CreateSentenceDto, UpdateSentenceDto } from './dto';
import { NotFoundException } from '@nestjs/common';
import { IdParamPipe } from '../common/pipes/user.pipes';
import {
  CreateSentencePipe,
  UpdateSentencePipe,
} from '../common/pipes/taxonomy.pipes';

@ApiTags('sentences')
@Controller('sentences')
export class SentencesController {
  constructor(private readonly sentences: SentencesService) {}
  @ApiOperation({ summary: '创建话术' })
  @Post()
  create(@Body(new CreateSentencePipe()) dto: CreateSentenceDto) {
    return this.sentences.create(dto);
  }
  @ApiOperation({ summary: '获取话术列表' })
  @Get()
  findAll() {
    return this.sentences.findAll();
  }
  @ApiOperation({ summary: '获取话术详情' })
  @Get(':id')
  async findOne(@Param('id', new IdParamPipe()) id: string) {
    const u = await this.sentences.findOne(id);
    if (!u)
      throw new NotFoundException({
        message: 'sentence not found',
        error: 'NotFound',
      });
    return u;
  }
  @ApiOperation({ summary: '更新话术' })
  @Patch(':id')
  async update(
    @Param('id', new IdParamPipe()) id: string,
    @Body(new UpdateSentencePipe()) dto: UpdateSentenceDto,
  ) {
    const u = await this.sentences.update(id, dto);
    if (!u)
      throw new NotFoundException({
        message: 'sentence not found',
        error: 'NotFound',
      });
    return u;
  }
  @ApiOperation({ summary: '删除话术' })
  @Delete(':id')
  async remove(@Param('id', new IdParamPipe()) id: string) {
    const res = await this.sentences.remove(id);
    if (!res.deleted)
      throw new NotFoundException({
        message: 'sentence not found',
        error: 'NotFound',
      });
    return res;
  }
}
