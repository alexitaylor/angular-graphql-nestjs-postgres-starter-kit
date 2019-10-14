import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { UsersEntity } from '../users/users.entity';
import { MessagesDto } from './dto/messages.dto';
import { Base } from '../common/entities/base.entity';

@Entity('message')
export class MessagesEntity extends Base {
  @Column({ type: 'text' })
  text: string;

  @ManyToOne(type => UsersEntity, user => user.messages)
  user: UsersEntity;

  toResponseObject(): MessagesDto {
    const { id, text, createdAt, updatedAt } = this;
    const responseObject: MessagesDto = {
      id,
      text,
      createdAt,
      updatedAt,
    };

    if (this.user) {
      responseObject.user = this.user;
    }

    return responseObject;
  }
}
