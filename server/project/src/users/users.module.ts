import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersResolvers } from './users.resolvers';
import { UsersService } from './users.service';
import { RolesEntity } from '../roles/roles.entity';
import { UsersEntity } from './users.entity';
import { MessagesEntity } from '../messages/messages.entity';
import { AuthResolvers } from './auth.resolvers';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersEntity, RolesEntity, MessagesEntity]),
  ],
  providers: [UsersService, UsersResolvers, AuthResolvers],
})
export class UsersModule {}
