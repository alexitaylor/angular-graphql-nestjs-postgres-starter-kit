import {IRole} from '@app/shared/model/role.model';

export interface IUser {
  id?: any;
  firstName?: string;
  lastName?: string;
  username?: string;
  email?: string;
  role?: IRole;
  createdAt?: Date;
  updatedAt?: Date;
}

export class User implements IUser {
  constructor(
    public id?: any,
    public firstName?: string,
    public lastName?: string,
    public username?: string,
    public email?: string,
    public role?: IRole,
    public createdAt?: Date,
    public updateAt?: Date
  ) {
    this.id = id ? id : null;
    this.username = username ? username : null;
    this.firstName = firstName ? firstName : null;
    this.lastName = lastName ? lastName : null;
    this.email = email ? email : null;
    this.role = role ? role : null;
    this.createdAt = createdAt ? createdAt : null;
    this.updateAt = updateAt ? updateAt : null;
  }
}
