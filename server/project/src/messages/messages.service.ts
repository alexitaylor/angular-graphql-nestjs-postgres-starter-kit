import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessagesEntity } from './messages.entity';
import { UsersEntity } from '../users/users.entity';
import { AppGateway } from '../app.gateway';
import { JwtPayload } from '../auth/jwt-payload.interface';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(MessagesEntity)
    private messagesRepository: Repository<MessagesEntity>,
    @InjectRepository(UsersEntity)
    private userRepository: Repository<UsersEntity>,
  ) {}

  // TODO cursor: string instead of page
  async findAll(page: number = 1, limit: number = 20, newest: boolean = true) {
    const messages = await this.messagesRepository.find({
      relations: ['user'],
      take: limit,
      skip: limit * (page - 1),
      order: newest && { updatedAt: 'DESC' },
    });
    return {
      edges: messages.map(message => message.toResponseObject()),
      pageInfo: {
        page,
        limit,
      },
    };
  }

  async findOneById(id: string) {
    const message = await this.messagesRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    return message.toResponseObject();
  }

  async createMessage(text: string, userId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    let message = await this.messagesRepository.create({ text, user });

    await this.messagesRepository.save(message);

    message = await this.messagesRepository.findOne({
      where: { id: message.id },
      relations: ['user'],
    });

    return message.toResponseObject();
  }

  async updateMessage(id: string, text: string, me: JwtPayload) {
    let message = await this.messagesRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!message) {
      throw new HttpException('Message not found', HttpStatus.NOT_FOUND);
    }

    if (message.user.id !== me.id && me.roleName !== 'ADMIN') {
      throw new HttpException('Action not allowed', HttpStatus.FORBIDDEN);
    }

    await this.messagesRepository.update({ id }, { text });
    message = await this.messagesRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    return message.toResponseObject();
  }

  async deleteMessage(id: string, me: JwtPayload) {
    const message = await this.messagesRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!message) {
      throw new HttpException('Message not found', HttpStatus.NOT_FOUND);
    }

    if (message.user.id !== me.id && me.roleName !== 'ADMIN') {
      throw new HttpException('Action not allowed', HttpStatus.FORBIDDEN);
    }

    await this.messagesRepository.remove(message);

    return message.toResponseObject();
  }
}
