import {UsersEntity} from '../../users/users.entity';

export class MessagesDto {
    id: string;
    text: string;
    createdAt: Date;
    updatedAt: Date;
    user?: UsersEntity;
}
