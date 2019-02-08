import { UsersEntity } from '../../users/users.entity';

export class MessagesDto {
  id: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
  user?: UsersEntity;
}

export class PageInfo {
  page: number;
  limit: number;
}

export class MessageConnection {
  edges: MessagesDto[];
  pageInfo: PageInfo;
}
