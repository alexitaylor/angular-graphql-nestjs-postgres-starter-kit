import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BeforeInsert,
  OneToMany,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

import { UserDto } from './dto/users.dto';
import { IsEmail, Length } from 'class-validator';
import { RolesEntity } from '../roles/roles.entity';
import { MessagesEntity } from '../messages/messages.entity';
import { environment } from '../environments/environment';
import { Base } from '../common/entities/base.entity';

@Entity('user')
export class UsersEntity extends Base {
  @Column({ type: 'text' })
  firstName: string;

  @Column({ type: 'text' })
  lastName: string;

  @Column({
    type: 'text',
    unique: true,
  })
  username: string;

  @Column({
    type: 'text',
    unique: true,
  })
  @IsEmail()
  email: string;

  @Column('text')
  @Length(7, 100)
  password: string;

  @ManyToOne(type => RolesEntity, role => role.users)
  role: RolesEntity;

  @OneToMany(type => MessagesEntity, messages => messages.user, {
    cascade: true,
  })
  messages: MessagesEntity[];

  @BeforeInsert()
  async hashPassword() {
    const salt = bcrypt.genSaltSync(environment.saltOrRounds);
    this.password = await bcrypt.hashSync(this.password, salt);
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compareSync(attempt, this.password);
  }

  toResponseObject(showToken: boolean = true): UserDto {
    const {
      id,
      firstName,
      lastName,
      username,
      email,
      createdAt,
      updatedAt,
      token,
    } = this;
    const responseObject: UserDto = {
      id,
      firstName,
      lastName,
      username,
      email,
      createdAt,
      updatedAt,
    };

    if (this.messages) {
      responseObject.messages = this.messages;
    }

    if (this.role) {
      responseObject.role = this.role;
    }

    if (showToken) {
      responseObject.token = token;
    }

    return responseObject;
  }

  private get token(): string {
    const { id, username, role } = this;

    return jwt.sign(
      {
        id,
        username,
        roleName: role.name,
      },
      environment.secret,
      { expiresIn: environment.expiresIn },
    );
  }
}
