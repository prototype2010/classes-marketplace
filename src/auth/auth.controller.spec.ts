import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import * as faker from 'faker';
import { INestApplication } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TypeOrmConfigOptions } from '../app.module';
import { UsersModule } from '../users/users.module';
import { User, USER_ROLES } from '../entity/user.entity';
import { hashString } from '../utils/hash';
import { createUserByParams } from '../utils/test';

import { AuthModule } from './auth.module';

const { internet, random } = faker;

describe('AuthController', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(TypeOrmConfigOptions),
        UsersModule,
        AuthModule,
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  describe('Registration', () => {
    describe('successful', () => {
      /* eslint-disable-next-line */
      let user: { [key: string]: any } = {};

      beforeEach(() => {
        /* parent */
        user.email = internet.email();
        user.phone = random.alphaNumeric(10);
        user.password = random.alphaNumeric(10);
        user.passwordConfirmation = user.password;
        user.firstName = random.alphaNumeric(10);
        user.lastName = random.alphaNumeric(10);
        user.role = USER_ROLES.BUSINESS;
      });

      test('User can be registered successfully', () =>
        request(app.getHttpServer())
          .post('/auth/signup')
          .send(user)
          .expect(201));

      test('Responce matches to user data', () =>
        request(app.getHttpServer())
          .post('/auth/signup')
          .send(user)
          .expect(201)
          .then(({ body }) => {
            expect(body.email).toBe(user.email);
            expect(body.phone).toBe(user.phone);
            expect(body.password).toBe(undefined);
            expect(body.id).toBeTruthy();
          }));
    });

    describe('unsuccessful', () => {
      /* eslint-disable-next-line */
      let user: { [key: string]: any } = {};

      beforeEach(() => {
        /* parent */
        user.email = internet.email();
        user.phone = random.alphaNumeric(10);
        user.password = random.alphaNumeric(10);
        user.passwordConfirmation = user.password;
        user.firstName = faker.random.alphaNumeric(10);
        user.lastName = faker.random.alphaNumeric(10);
        user.role = USER_ROLES.PARENT;
      });

      test('Empty phone', () => {
        return request(app.getHttpServer())
          .post('/auth/signup')
          .send({ ...user, phone: '' })
          .expect(400, {
            statusCode: 400,
            message: [
              { message: '"phone" is not allowed to be empty', path: 'phone' },
            ],
            error: 'Bad Request',
          });
      });

      test('Empty email address', () => {
        return request(app.getHttpServer())
          .post('/auth/signup')
          .send({ ...user, email: '' })
          .expect(400, {
            statusCode: 400,
            message: [
              { message: '"email" is not allowed to be empty', path: 'email' },
            ],
            error: 'Bad Request',
          });
      });

      test('Passwords do not match', () => {
        return request(app.getHttpServer())
          .post('/auth/signup')
          .send({ ...user, password: 'asdasd' })
          .expect(400, {
            statusCode: 400,
            message: [
              {
                message: '"password" length must be at least 8 characters long',
                path: 'password',
              },
              {
                message: '"passwordConfirmation" must be [ref:password]',
                path: 'passwordConfirmation',
              },
            ],
            error: 'Bad Request',
          });
      });
      test('Password is absent', () => {
        return request(app.getHttpServer())
          .post('/auth/signup')
          .send({ ...user, password: undefined })
          .expect(400, {
            statusCode: 400,
            message: [
              { message: '"password" is required', path: 'password' },
              {
                message: '"passwordConfirmation" must be [ref:password]',
                path: 'passwordConfirmation',
              },
            ],
            error: 'Bad Request',
          });
      });

      test('Password confirmation is absent', () => {
        return request(app.getHttpServer())
          .post('/auth/signup')
          .send({ ...user, passwordConfirmation: undefined })
          .expect(400, {
            statusCode: 400,
            message: [
              {
                message: '"passwordConfirmation" is required',
                path: 'passwordConfirmation',
              },
            ],
            error: 'Bad Request',
          });
      });

      test('Register as Chuck Norris', () => {
        return request(app.getHttpServer())
          .post('/auth/signup')
          .send({ ...user, role: 'CHUCK_NORRIS' })
          .expect(400, {
            statusCode: 400,
            message: [
              {
                message: '"role" must be one of [business, parent]',
                path: 'role',
              },
            ],
            error: 'Bad Request',
          });
      });
      test('Role is not defined', () => {
        return request(app.getHttpServer())
          .post('/auth/signup')
          .send({ ...user, role: undefined })
          .expect(400, {
            statusCode: 400,
            message: [{ message: '"role" is required', path: 'role' }],
            error: 'Bad Request',
          });
      });

      test('Both passwords absent', () => {
        return request(app.getHttpServer())
          .post('/auth/signup')
          .send({
            ...user,
            passwordConfirmation: undefined,
            password: undefined,
          })
          .expect(400, {
            statusCode: 400,
            message: [
              { message: '"password" is required', path: 'password' },
              {
                message: '"passwordConfirmation" is required',
                path: 'passwordConfirmation',
              },
            ],
            error: 'Bad Request',
          });
      });

      test('Empty request', () => {
        return request(app.getHttpServer())
          .post('/auth/signup')
          .send()
          .expect(400, {
            statusCode: 400,
            message: [
              { message: '"email" is required', path: 'email' },
              { message: '"phone" is required', path: 'phone' },
              { message: '"password" is required', path: 'password' },
              {
                message: '"passwordConfirmation" is required',
                path: 'passwordConfirmation',
              },
              { message: '"role" is required', path: 'role' },
              { message: '"firstName" is required', path: 'firstName' },
              { message: '"lastName" is required', path: 'lastName' },
            ],
            error: 'Bad Request',
          });
      });
    });
  });

  describe('Authorization', () => {
    describe('successful', () => {
      /* eslint-disable-next-line */
      let user: { [key: string]: any } = {};

      beforeEach(async () => {
        const { userParams } = await createUserByParams();
        user = userParams;
      });

      test('User can sign in successfully', () =>
        request(app.getHttpServer())
          .post('/auth/signin')
          .send({
            email: user.email,
            password: user.password,
          })
          .expect(201));

      fit('Token is present in response body', () =>
        request(app.getHttpServer())
          .post('/auth/signin')
          .send({
            email: user.email,
            password: user.password,
          })
          .then(({ body }) => {
            expect(body.token).toBeTruthy();
          }));
    });

    describe('unsuccessful', () => {
      /* eslint-disable-next-line */
      let user: { [key: string]: any } = {};

      beforeEach(async () => {
        /* parent */
        user.email = internet.email();
        user.phone = random.alphaNumeric(10);
        user.password = random.alphaNumeric(10);
        user.passwordConfirmation = user.password;
        user.firstName = random.alphaNumeric(10);
        user.lastName = random.alphaNumeric(10);
        user.role = USER_ROLES.BUSINESS;

        await request(app.getHttpServer())
          .post('/auth/signup')
          .send(user);
      });

      test('User cannot login with wrong password', () =>
        request(app.getHttpServer())
          .post('/auth/signin')
          .send({
            email: user.email,
            password: user.email,
          })
          .expect(401, { statusCode: 401, message: 'Unauthorized' }));

      test('User cannot login with wrong email', () =>
        request(app.getHttpServer())
          .post('/auth/signin')
          .send({
            email: 'chuck_norris@mail.ru',
            password: user.password,
          })
          .expect(401, { statusCode: 401, message: 'Unauthorized' }));

      test('User cannot login with wrong email', () =>
        request(app.getHttpServer())
          .post('/auth/signin')
          .send({
            email: 'chuck_norris@mail.ru',
            password: user.password,
          })
          .expect(401, { statusCode: 401, message: 'Unauthorized' }));

      test('User cannot login with empty fields', () =>
        request(app.getHttpServer())
          .post('/auth/signin')
          .send({})
          .expect(401, { statusCode: 401, message: 'Unauthorized' }));

      test('Other fields are not allowed', () =>
        request(app.getHttpServer())
          .post('/auth/signin')
          .send({ secret: '123124' })
          .expect(401, { statusCode: 401, message: 'Unauthorized' }));
    });
  });
});
