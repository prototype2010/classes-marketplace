import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { db } from 'config';
import { UsersModule } from './users/users.module';
import { User } from './entity/user.entity';
import { AuthModule } from './auth/auth.module';

const { type, port, database, synchronize, username, password } = db;

export const TypeOrmConfigOptions = {
  type,
  host: 'localhost',
  port,
  username,
  password,
  database,
  entities: [User], // TODO replcae this to path
  synchronize,
  autoLoadEntities: true,
};

@Module({
  imports: [
    TypeOrmModule.forRoot(TypeOrmConfigOptions),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
