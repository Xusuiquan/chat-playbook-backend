import { Module } from '@nestjs/common';
import { SentencesController } from './sentences.controller';
import { SentencesService } from './sentences.service';
import { DatabaseService } from '../database.service';

@Module({
  controllers: [SentencesController],
  providers: [SentencesService, DatabaseService],
})
export class SentencesModule {}
