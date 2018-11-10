export interface IUser {
  id?: any;
  firstName?: string;
  lastName?: string;
  login?: string;
  email?: string;
  role?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class User implements IUser {
  constructor(
    public id?: any,
    public firstName?: string,
    public lastName?: string,
    public login?: string,
    public email?: string,
    public role?: string,
    public createdAt?: Date,
    public updateAt?: Date
  ) {
    this.id = id ? id : null;
    this.login = login ? login : null;
    this.firstName = firstName ? firstName : null;
    this.lastName = lastName ? lastName : null;
    this.email = email ? email : null;
    this.role = role ? role : null;
    this.createdAt = createdAt ? createdAt : null;
    this.updateAt = updateAt ? updateAt : null;
  }
}
