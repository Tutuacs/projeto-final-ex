import { Module } from '@nestjs/common';
import { PresentListService } from './present-list.service';
import { PresentListController } from './present-list.controller';

@Module({
  controllers: [PresentListController],
  providers: [PresentListService],
})
export class PresentListModule {}
