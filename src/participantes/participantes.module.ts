import { Module } from '@nestjs/common';
import { ParticipantesService } from './participantes.service';
import { ParticipantesController } from './participantes.controller';

@Module({
  controllers: [ParticipantesController],
  providers: [ParticipantesService],
})
export class ParticipantesModule {}
