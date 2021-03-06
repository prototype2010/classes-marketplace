import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { db } from 'config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

const { type, port, database, synchronize, username, password } = db;

export const TypeOrmConfigOptions = {
  type,
  host: 'localhost',
  port,
  username,
  password,
  database,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
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
