import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesResolvers } from './roles.resolvers';
import { RolesService } from './roles.service';
import { UsersEntity } from '../users/users.entity';
import { RolesEntity } from './roles.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RolesEntity, UsersEntity])],
  providers: [RolesService, RolesResolvers],
})
export class RolesModule {}
