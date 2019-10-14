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
import { Base } from '../common/entities/base.entity';

@Entity('role')
export class RolesEntity extends Base {
  @Column({ type: 'text' })
  name: string;

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
