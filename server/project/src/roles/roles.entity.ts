import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';
import { UsersEntity } from '../users/users.entity';
import { RolesDto } from './dto/roles.dto';

@Entity('role')
export class RolesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(type => UsersEntity, user => user.role)
  users: UsersEntity[];

  toResponseObject(): RolesDto {
    const { id, name, createdAt, updatedAt } = this;
    const responseObject: RolesDto = {
      id,
      name,
      createdAt,
      updatedAt,
    };

    if (this.users) {
      responseObject.users = this.users;
    }

    return responseObject;
  }
}
