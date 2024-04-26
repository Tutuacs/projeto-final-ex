import { Module } from '@nestjs/common';
import { ParticipantesModule } from './participantes/participantes.module';
import { EmailModule } from './email/email.module';
import { RankingModule } from './ranking/ranking.module';
import { EventoModule } from './evento/evento.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { MessageModule } from './message/message.module';
import { PresentListModule } from './present-list/present-list.module';

@Module({
  imports: [ParticipantesModule, EmailModule, RankingModule, EventoModule, UsuariosModule, MessageModule, PresentListModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
