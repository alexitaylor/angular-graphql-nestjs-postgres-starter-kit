import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { MessagesModule } from './messages/messages.module';
import {AuthModule} from './auth/auth.module';
import {APP_INTERCEPTOR} from '@nestjs/core';
import {LoggingInterceptor} from './shared/logging.interceptor';

// TODO add subscriptions with installSubscriptionHandlers: true in GraphQLModule
@Module({
  imports: [
      TypeOrmModule.forRoot(),
      AuthModule,
      MessagesModule,
      UsersModule,
      RolesModule,
      GraphQLModule.forRoot({
          typePaths: ['./**/*.graphql'],
          context: ({ req }) => ({ headers: req.headers }),
          definitions: {
              path: join(process.cwd(), 'src/graphql.schema.ts'),
              outputAs: 'class',
          },
      }),
  ],
  controllers: [AppController],
  providers: [
      AppService,
      {
          provide: APP_INTERCEPTOR,
          useClass: LoggingInterceptor,
      },
  ],
})
export class AppModule {}
