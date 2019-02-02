import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription, Context } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { UsersService } from './users.service';
import {SignUpUserDto, SignInUserDto, CreateUpdateUserDto, UserDto, Token} from './dto/users.dto';
import {AuthGuard} from '../auth/guards/auth.guard';
import {RolesGuard} from '../auth/guards/roles.guard';
import {Roles} from '../decorators/roles.decorators';
// import { UsersGuard } from './users.guard';
// import { User } from '../graphql.schema';

const pubSub = new PubSub();

@Resolver('User')
@UseGuards(RolesGuard)
export class UsersResolvers {
    constructor(private readonly usersService: UsersService) {}

    // TODO pagination cursor instead of page???
    @Query('users')
    @Roles('ADMIN')
    @UseGuards(new AuthGuard())
    async getUsers(
        @Args('page') page: number,
        @Args('limit') limit: number,
        @Args('newest') newest: boolean
    ): Promise<UserDto[]> {
        return await this.usersService.findAll();
    }

    @Query('user')
    @Roles('ADMIN', 'USER')
    @UseGuards(new AuthGuard())
    async findOneById(
        @Args('id') id: string,
    ): Promise<UserDto> {
        return await this.usersService.findOneById(id);
    }

    @Mutation('createUser')
    @Roles('ADMIN')
    @UseGuards(new AuthGuard())
    async createUser(@Args('createUserInput') args: CreateUpdateUserDto): Promise<UserDto> {
        const createdUser = await this.usersService.createUser(args);
        pubSub.publish('userCreated', { userCreated: createdUser });
        return createdUser;
    }

    @Mutation('updateUser')
    @Roles('ADMIN')
    @UseGuards(new AuthGuard())
    async updateUser(@Args('updateUserInput') args: CreateUpdateUserDto): Promise<UserDto> {
        const updatedUser = await this.usersService.updateUser(args);
        pubSub.publish('updatedUser', { updatedUser: updatedUser });
        return updatedUser;
    }

    @Mutation('deleteUser')
    @Roles('ADMIN')
    @UseGuards(new AuthGuard())
    async deleteUser(@Args('id') id: string): Promise<UserDto> {
        const deletedUser = await this.usersService.deleteUser(id);
        pubSub.publish('deletedUser', { deletedUser: deletedUser });
        return deletedUser;
    }
}
