import * as request from 'supertest';
import { Test } from '@nestjs/testing';

import * as faker from 'faker';
import { INestApplication } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigOptions } from '../app.module';
import { UsersModule } from '../users/users.module';
import { AuthModule } from './auth.module';
import { USER_ROLES } from '../entity/user.entity';
const { internet, phone, company, name, random } = faker;

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

  describe('parent registration', () => {
    describe('successful registration', () => {
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

    describe('unsuccessful registration', () => {
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

  describe('Business registration', () => {
    describe('successful registration', () => {
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

      it('User can be registered successfully', () =>
        request(app.getHttpServer())
          .post('/auth/signup')
          .send(user)
          .expect(201));

      it('Responce matches to user data', () =>
        request(app.getHttpServer())
          .post('/auth/signup')
          .send(user)
          .expect(201)
          .then(({ body }) => {
            expect(body.email).toBe(user.email);
            expect(body.phone).toBe(user.phone);
            expect(body.password).toBe(undefined);
            expect(body.firstName).toBe(user.firstName);
            expect(body.lastName).toBe(user.lastName);
            expect(body.role).toBe(user.role);
            expect(body.id).toBeTruthy();
          }));
    });

    describe('unsuccessful registration', () => {
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
        user.role = USER_ROLES.BUSINESS;
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
});
