import {ParseIntPipe, UseGuards} from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import {RolesService} from './roles.service';
import {RolesDto} from './dto/roles.dto';
import {AuthGuard} from '../auth/guards/auth.guard';
import {RolesGuard} from '../auth/guards/roles.guard';
import {Roles} from '../decorators/roles.decorators';
const pubSub = new PubSub();

@Resolver('Role')
@UseGuards(new AuthGuard(), RolesGuard)
export class RolesResolvers {
    constructor(private readonly rolesService: RolesService) {}

    @Query('roles')
    @Roles('ADMIN')
    async getRoles(): Promise<RolesDto[]> {
        return await this.rolesService.findAll();
    }

    @Query('role')
    @Roles('ADMIN')
    async findOneById(
        @Args('id', ParseIntPipe)
            id: number,
    ): Promise<RolesDto> {
        return await this.rolesService.findOneById(id);
    }

    @Mutation('createRole')
    @Roles('ADMIN')
    async createRole(
        @Args('name') name: string
    ): Promise<RolesDto> {
        const createdRole = await this.rolesService.createRole(name);
        pubSub.publish('createdRole', { createdRole: createdRole });
        return createdRole;
    }

    @Mutation('updateRole')
    @Roles('ADMIN')
    async updateRole(
        @Args('id') id: string,
        @Args('name') name: string
    ): Promise<RolesDto> {
        const updatedRole = await this.rolesService.updateRole(id, name);
        pubSub.publish('updatedRole', { updatedRole: updatedRole });
        return updatedRole;
    }

    @Mutation('deleteRole')
    @Roles('ADMIN')
    async deleteRole(@Args('id') id: string): Promise<RolesDto> {
        const deletedRole = await this.rolesService.deleteRole(id);
        pubSub.publish('deletedRole', { deletedRole: deletedRole });
        return deletedRole;
    }
}
