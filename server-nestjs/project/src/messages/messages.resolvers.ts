import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription, Context } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import {MessagesService} from './messages.service';
import {MessagesDto} from './dto/messages.dto';
import {AuthGuard} from '../auth/guards/auth.guard';
import {Roles} from '../decorators/roles.decorators';

const pubSub = new PubSub();

@Resolver('Message')
@UseGuards(new AuthGuard())
export class MessagesResolvers {
    constructor(private readonly messagesService: MessagesService) {}

    // TODO pagination cursor instead of page???
    @Query('messages')
    @Roles('ADMIN', 'USER')
    async getMessages(
        @Args('page') page: number,
        @Args('limit') limit: number,
        @Args('newest') newest: boolean
    ): Promise<MessagesDto[]> {
        return await this.messagesService.findAll(page, limit, newest);
    }

    @Query('message')
    @Roles('ADMIN', 'USER')
    async findOneById(
        @Args('id', ParseIntPipe)
            id: number,
    ): Promise<MessagesDto> {
        return await this.messagesService.findOneById(id);
    }

    @Mutation('createMessage')
    @Roles('ADMIN', 'USER')
    async createMessage(
        @Args('text') text: string,
        @Context('me') me
    ): Promise<MessagesDto> {
        const userId = me.id;
        const createdMessage = await this.messagesService.createMessage(text, userId);
        pubSub.publish('createdMessage', { createdMessage: createdMessage });
        return createdMessage;
    }

    @Mutation('updateMessage')
    @Roles('ADMIN', 'USER')
    async updateMessage(
        @Args('id') id: string,
        @Args('text') text: string,
        @Context('me') me
    ): Promise<MessagesDto> {
        const updatedMessage = await this.messagesService.updateMessage(id, text, me);
        pubSub.publish('updatedMessage', { updatedMessage: updatedMessage });
        return updatedMessage;
    }

    // TODO isMessageOwnerOrAdmin
    @Mutation('deleteMessage')
    @Roles('ADMIN', 'USER')
    async deleteMessage(@Args('id') id: string, @Context('me') me): Promise<MessagesDto> {
        const deletedMessage = await this.messagesService.deleteMessage(id, me);
        pubSub.publish('deletedMessage', { deletedMessage: deletedMessage });
        return deletedMessage;
    }

    // TODO @Subscription
}
