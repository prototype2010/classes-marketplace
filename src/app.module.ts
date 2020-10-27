import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { db } from 'config';
import { UsersModule } from './users/users.module';
import { User } from './entity/user.entity';

const { type, port, database, synchronize, username, password } = db;

export const TypeOrmConfigOptions = {
  type,
  host: 'localhost',
  port,
  username,
  password,
  database,
  entities: [User],
  synchronize,
};

@Module({
  imports: [TypeOrmModule.forRoot(TypeOrmConfigOptions), UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
