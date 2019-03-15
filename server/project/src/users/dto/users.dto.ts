import { IsNotEmpty, Length } from 'class-validator';
import { RolesEntity } from '../../roles/roles.entity';
import { MessagesEntity } from '../../messages/messages.entity';

export class UserDto {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  token?: string;
  role?: RolesEntity;
  messages?: MessagesEntity[];
}

// TODO CHANGE extends CreateUserInput
export class SignUpUserDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  username: string;

  @Length(7, 100)
  password: string;
}

export class SignInUserDto {
  @IsNotEmpty()
  login: string;

  @Length(7, 100)
  password: string;
}

export class CreateUpdateUserDto {
  id?: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  username: string;

  password?: string;

  roleName?: string;
}

export class CreateUser {
  constructor(
    public id: string,
    public firstName: string,
    public lastName: string,
    public email: string,
    public username: string,
    public password: string,
    public createdAt: Date,
  ) {}
}

export class Token {
  token: string;
}
