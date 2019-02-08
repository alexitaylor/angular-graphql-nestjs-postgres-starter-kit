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

@Entity('message')
export class MessagesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  text: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

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
