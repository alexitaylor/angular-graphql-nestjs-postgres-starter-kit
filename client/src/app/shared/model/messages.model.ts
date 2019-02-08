import { IUser } from '@app/shared/model/user.model';

export interface IMessages {
  id?: any;
  text?: string;
  createdAt?: string;
  updatedAt?: string;
  user?: IUser;
}

export class Messages implements IMessages {
  constructor(
    public id?: any,
    public text?: string,
    public createdAt?: string,
    public updatedAt?: string,
    public user?: IUser
  ) {
    this.id = id ? id : null;
    this.text = text ? text : null;
    this.createdAt = createdAt ? createdAt : null;
    this.updatedAt = updatedAt ? updatedAt : null;
    this.user = user ? user : null;
  }
}
