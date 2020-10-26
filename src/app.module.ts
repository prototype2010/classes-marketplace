import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { db } from 'config';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';

const { type, port, database, synchronize, username, password } = db;

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type,
      host: 'localhost',
      port,
      username,
      password,
      database,
      entities: [User],
      synchronize,
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
