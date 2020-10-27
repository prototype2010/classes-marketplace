import * as request from 'supertest';
import { Test } from '@nestjs/testing';

import { internet, phone } from 'faker';
import { INestApplication } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users.module';
import { TypeOrmConfigOptions } from '../app.module';

describe('UsersController', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(TypeOrmConfigOptions), UsersModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  describe('parent registration', () => {
    describe('successful registration', () => {
      /* eslint-disable-next-line */
      let user: { [key: string]: any } = {};

      beforeEach(() => {
        user.email = internet.email();
        user.phone = phone.phoneNumber();
        user.password = internet.password();
        user.passwordConfirmation = user.password;
      });

      test('User can be registered successfully', () => {
        return request(app.getHttpServer())
          .post('/users/parent')
          .send(user)
          .expect(201);
      });

      test('Responce matches to user data', () => {
        return request(app.getHttpServer())
          .post('/users/parent')
          .send(user)
          .expect(201)
          .then(({ body }) => {
            expect(body.email).toBe(user.email);
            expect(body.phone).toBe(user.phone);
            expect(body.password).toBe(undefined);
            expect(body.id).toBeTruthy();
          });
      });
    });

    describe('unsuccessful registration', () => {
      let user;

      beforeEach(() => {});
    });
  });

  describe('business registration', () => {
    describe('successful registration', () => {
      let user;

      beforeEach(() => {});
    });

    describe('unsuccessful registration', () => {
      let user;

      beforeEach(() => {});
    });
  });

  // let controller: UsersController;
  //
  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     controllers: [UsersController],
  //   }).compile();
  //
  //   controller = module.get<UsersController>(UsersController);
  // });
  //
  // it('should be defined', () => {
  //   expect(controller).toBeDefined();
  // });
});
