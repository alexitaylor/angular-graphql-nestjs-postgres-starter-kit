import { Connection } from 'typeorm';
import * as faker from 'faker';
import { UsersEntity } from '../../src/users/users.entity';
import { MessagesEntity } from '../../src/messages/messages.entity';

export const createMessages = async (
  connection: Connection,
  users: UsersEntity[],
): Promise<MessagesEntity[]> => {
  const messages = [];
  let message: MessagesEntity;
  let user: UsersEntity;

  // Generate 100 random messages
  for (let i = 0; i < 100; i++) {
    // Randomly assign a user to message
    user = users[faker.random.number(users.length - 1)];
    message = generateRandomMessages(user);
    await connection
      .createQueryBuilder()
      .insert()
      .into(MessagesEntity)
      .values(message)
      .execute();
    messages.push(message);
  }

  return messages;
};

const generateRandomMessages = (user: UsersEntity): MessagesEntity => {
  const random = faker.random.number(1);
  const text = random ? faker.lorem.sentence() : faker.lorem.sentences();

  const message = new MessagesEntity();
  message.text = text;
  message.user = user;

  return message;
};
