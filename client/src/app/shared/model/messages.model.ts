export interface IMessages {
  id?: any;
  text?: string;
  createdAt?: Date;
  updatedAt?: Date;
  userId?: number;
}

export class Messages implements IMessages {
  constructor(
    public id?: any,
    public text?: string,
    public createdAt?: Date,
    public updatedAt?: Date,
    public userId?: number,
  ) {
    this.id = id ? id : null;
    this.text = text ? text : null;
    this.createdAt = createdAt? createdAt : null;
    this.updatedAt = updatedAt? updatedAt : null;
    this.userId = userId ? userId : null;
  }
}
