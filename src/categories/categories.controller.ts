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
import { CategoriesService } from './categories.service';
import type { CreateCategoryDto, UpdateCategoryDto } from './dto';
import { NotFoundException } from '@nestjs/common';
import { IdParamPipe } from '../common/pipes/user.pipes';
import {
  CreateCategoryPipe,
  UpdateCategoryPipe,
} from '../common/pipes/taxonomy.pipes';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categories: CategoriesService) {}
  @ApiOperation({ summary: '创建分类' })
  @Post()
  create(@Body(new CreateCategoryPipe()) dto: CreateCategoryDto) {
    return this.categories.create(dto);
  }
  @ApiOperation({ summary: '获取分类列表' })
  @Get()
  findAll() {
    return this.categories.findAll();
  }
  @ApiOperation({ summary: '获取分类详情' })
  @Get(':id')
  async findOne(@Param('id', new IdParamPipe()) id: string) {
    const cat = await this.categories.findOne(id);
    if (!cat)
      throw new NotFoundException({
        message: 'category not found',
        error: 'NotFound',
      });
    return cat;
  }
  @ApiOperation({ summary: '更新分类' })
  @Patch(':id')
  async update(
    @Param('id', new IdParamPipe()) id: string,
    @Body(new UpdateCategoryPipe()) dto: UpdateCategoryDto,
  ) {
    const cat = await this.categories.update(id, dto);
    if (!cat)
      throw new NotFoundException({
        message: 'category not found',
        error: 'NotFound',
      });
    return cat;
  }
  @ApiOperation({ summary: '删除分类' })
  @Delete(':id')
  async remove(@Param('id', new IdParamPipe()) id: string) {
    const res = await this.categories.remove(id);
    if (!res.deleted)
      throw new NotFoundException({
        message: 'category not found',
        error: 'NotFound',
      });
    return res;
  }
}
