import { Module } from '@nestjs/common';
import { TopicsController } from './topics.controller';
import { TopicsService } from './topics.service';
import { DatabaseService } from '../database.service';

@Module({
  controllers: [TopicsController],
  providers: [TopicsService, DatabaseService],
})
export class TopicsModule {}
