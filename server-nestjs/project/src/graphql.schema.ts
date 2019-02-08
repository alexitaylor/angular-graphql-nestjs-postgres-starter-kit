/* tslint:disable */
export class CreateUserInput {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    roleName?: string;
}

export class UpdateUseInput {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    roleName: string;
}

export class Message {
    id: string;
    text: string;
    createdAt: string;
    updatedAt: string;
    user: User;
}

export class MessageConnection {
    edges: Message[];
    pageInfo: PageInfo;
}

export class MessageCreated {
    message: Message;
    messages: MessageConnection;
}

export abstract class IMutation {
    abstract createMessage(text: string): Message | Promise<Message>;

    abstract updateMessage(id: string, text: string): Message | Promise<Message>;

    abstract deleteMessage(id: string): boolean | Promise<boolean>;

    abstract createRole(name: string): Role | Promise<Role>;

    abstract updateRole(id: string, name: string): Role | Promise<Role>;

    abstract deleteRole(id: string): boolean | Promise<boolean>;

    abstract signIn(login: string, password: string): Token | Promise<Token>;

    abstract signUp(firstName: string, lastName: string, email: string, username: string, password: string): Token | Promise<Token>;

    abstract createUser(createUserInput?: CreateUserInput): User | Promise<User>;

    abstract updateUser(updateUserInput?: UpdateUseInput): User | Promise<User>;

    abstract deleteUser(id: string): boolean | Promise<boolean>;
}

export class PageInfo {
    page: number;
    limit: number;
}

export abstract class IQuery {
    abstract messages(page?: number, limit?: number, newest?: boolean): MessageConnection | Promise<MessageConnection>;

    abstract message(id: string): Message | Promise<Message>;

    abstract roles(): Role[] | Promise<Role[]>;

    abstract role(id: string): Role | Promise<Role>;

    abstract users(): User[] | Promise<User[]>;

    abstract user(id: string): User | Promise<User>;

    abstract me(): User | Promise<User>;

    abstract temp__(): boolean | Promise<boolean>;
}

export class Role {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
}

export abstract class ISubscription {
    abstract messageCreated(): Message | Promise<Message>;
}

export class Token {
    token: string;
}

export class User {
    id: string;
    firstName: string;
    lastName: string;
    username?: string;
    email: string;
    role: Role;
    createdAt: string;
    updatedAt: string;
    messages: Message[];
}
