export interface IRole {
  id?: number,
  name?: string,
  createdAt?: Date;
  updatedAt?: Date;
}

export class Role implements IRole {
  constructor(
    public id?: number,
    public name?: string,
    public createdAt?: Date,
    public updateAt?: Date
  ) {
    this.id = id ? id : null;
    this.name = name ? name : null;
    this.createdAt = createdAt ? createdAt : null;
    this.updateAt = updateAt ? updateAt : null;
  }
}
