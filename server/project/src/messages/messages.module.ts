import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesService } from './messages.service';
import { MessagesResolvers } from './messages.resolvers';
import { MessagesEntity } from './messages.entity';
import { UsersEntity } from '../users/users.entity';
import { AppGateway } from '../app.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([MessagesEntity, UsersEntity])],
  providers: [MessagesService, MessagesResolvers],
})
export class MessagesModule {}
