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

describe('UsersController', () => {
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
        user.name = name.findName();
        user.phone = phone.phoneNumber();
        user.password = random.alphaNumeric(10);
        user.passwordConfirmation = user.password;
      });

      test('User can be registered successfully', () =>
        request(app.getHttpServer())
          .post('/users/parent')
          .send(user)
          .expect(201));

      test('User can be registered successfully2', () =>
        request(app.getHttpServer())
          .post('/users/parent')
          .send(user)
          .expect(201));

      test('Responce matches to user data', () =>
        request(app.getHttpServer())
          .post('/users/parent')
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
        user.phone = phone.phoneNumber();
        user.password = random.alphaNumeric(10);
        user.passwordConfirmation = user.password;
      });

      test('Empty phone', () => {
        return request(app.getHttpServer())
          .post('/users/parent')
          .send({ ...user, phone: '' })
          .expect(400, {
            statusCode: 400,
            message: ['phone must be longer than or equal to 6 characters'],
            error: 'Bad Request',
          });
      });

      test('Empty email address', () => {
        return request(app.getHttpServer())
          .post('/users/parent')
          .send({ ...user, email: '' })
          .expect(400, {
            statusCode: 400,
            message: ['email must be an email'],
            error: 'Bad Request',
          });
      });

      test('Passwords do not match', () => {
        return request(app.getHttpServer())
          .post('/users/parent')
          .send({ ...user, password: undefined })
          .expect(400, {
            statusCode: 400,
            message: [
              'password must be longer than or equal to 8 characters',
              'password must be a string',
              'Passwords should match',
            ],
            error: 'Bad Request',
          });
      });
      test('Password confirmation is absent', () => {
        return request(app.getHttpServer())
          .post('/users/parent')
          .send({ ...user, passwordConfirmation: undefined })
          .expect(400, {
            statusCode: 400,
            message: [
              'Passwords should match',
              'passwordConfirmation must be longer than or equal to 8 characters',
              'passwordConfirmation must be a string',
            ],
            error: 'Bad Request',
          });
      });

      test('Both passwords absent', () => {
        return request(app.getHttpServer())
          .post('/users/parent')
          .send({
            ...user,
            passwordConfirmation: undefined,
            password: undefined,
          })
          .expect(400, {
            statusCode: 400,
            message: [
              'password must be longer than or equal to 8 characters',
              'password must be a string',
              'Passwords should match',
              'passwordConfirmation must be longer than or equal to 8 characters',
              'passwordConfirmation must be a string',
            ],
            error: 'Bad Request',
          });
      });

      test('Empty request', () => {
        return request(app.getHttpServer())
          .post('/users/parent')
          .send()
          .expect(400, {
            statusCode: 400,
            message: [
              'email must be an email',
              'phone must be longer than or equal to 6 characters',
              'phone must be a string',
              'password must be longer than or equal to 8 characters',
              'password must be a string',
              'Passwords should match',
              'passwordConfirmation must be longer than or equal to 8 characters',
              'passwordConfirmation must be a string',
            ],
            error: 'Bad Request',
          });
      });
    });
  });

  // describe('business registration', () => {
  //   describe('successful registration', () => {
  //     /* eslint-disable-next-line */
  //     let user: { [key: string]: any } = {};
  //
  //     beforeEach(() => {
  //       user.email = internet.email();
  //       user.phone = phone.phoneNumber();
  //       user.password = random.alphaNumeric(10);
  //       user.passwordConfirmation = user.password;
  //       user.localBusinessId = faker.random.alphaNumeric(10);
  //       user.name = company.companyName();
  //     });
  //
  //     test('User can be registered successfully', () =>
  //       request(app.getHttpServer())
  //         .post('/users/business')
  //         .send(user)
  //         .expect(201));
  //
  //     test('Responce matches to user data', () =>
  //       request(app.getHttpServer())
  //         .post('/users/business')
  //         .send(user)
  //         .expect(201)
  //         .then(({ body }) => {
  //           expect(body.email).toBe(user.email);
  //           expect(body.phone).toBe(user.phone);
  //           expect(body.password).toBe(undefined);
  //           expect(body.id).toBeTruthy();
  //           expect(body.name).toBe(user.name);
  //           expect(body.type).toBe(USER_ROLES.BUSINESS);
  //           expect(body.localBusinessId).toBe(user.localBusinessId);
  //         }));
  //   });
  //
  //   describe('unsuccessful registration', () => {
  //     /* eslint-disable-next-line */
  //     let user: { [key: string]: any } = {};
  //
  //     beforeEach(() => {
  //       user.email = internet.email();
  //       user.phone = phone.phoneNumber();
  //       user.password = random.alphaNumeric(10);
  //       user.passwordConfirmation = user.password;
  //       user.localBusinessId = random.alphaNumeric(10);
  //       user.name = company.companyName();
  //     });
  //
  //     test('Empty business id', () => {
  //       return request(app.getHttpServer())
  //         .post('/users/business')
  //         .send({ ...user, localBusinessId: '' })
  //         .expect(400, {
  //           statusCode: 400,
  //           message: [
  //             'localBusinessId must be longer than or equal to 8 characters',
  //           ],
  //           error: 'Bad Request',
  //         });
  //     });
  //
  //     test('Empty phone', () => {
  //       return request(app.getHttpServer())
  //         .post('/users/business')
  //         .send({ ...user, phone: '' })
  //         .expect(400, {
  //           statusCode: 400,
  //           message: ['phone must be longer than or equal to 6 characters'],
  //           error: 'Bad Request',
  //         });
  //     });
  //
  //     test('Empty email address', () => {
  //       return request(app.getHttpServer())
  //         .post('/users/business')
  //         .send({ ...user, email: '' })
  //         .expect(400, {
  //           statusCode: 400,
  //           message: ['email must be an email'],
  //           error: 'Bad Request',
  //         });
  //     });
  //
  //     test('Passwords do not match', () => {
  //       return request(app.getHttpServer())
  //         .post('/users/business')
  //         .send({ ...user, password: undefined })
  //         .expect(400, {
  //           statusCode: 400,
  //           message: [
  //             'password must be longer than or equal to 8 characters',
  //             'password must be a string',
  //             'Passwords should match',
  //           ],
  //           error: 'Bad Request',
  //         });
  //     });
  //     test('Password confirmation is absent', () => {
  //       return request(app.getHttpServer())
  //         .post('/users/business')
  //         .send({ ...user, passwordConfirmation: undefined })
  //         .expect(400, {
  //           statusCode: 400,
  //           message: [
  //             'Passwords should match',
  //             'passwordConfirmation must be longer than or equal to 8 characters',
  //             'passwordConfirmation must be a string',
  //           ],
  //           error: 'Bad Request',
  //         });
  //     });
  //
  //     test('Both passwords absent', () => {
  //       return request(app.getHttpServer())
  //         .post('/users/business')
  //         .send({
  //           ...user,
  //           passwordConfirmation: undefined,
  //           password: undefined,
  //         })
  //         .expect(400, {
  //           statusCode: 400,
  //           message: [
  //             'password must be longer than or equal to 8 characters',
  //             'password must be a string',
  //             'Passwords should match',
  //             'passwordConfirmation must be longer than or equal to 8 characters',
  //             'passwordConfirmation must be a string',
  //           ],
  //           error: 'Bad Request',
  //         });
  //     });
  //
  //     test('Empty request', () => {
  //       return request(app.getHttpServer())
  //         .post('/users/business')
  //         .send()
  //         .expect(400, {
  //           statusCode: 400,
  //           message: [
  //             'localBusinessId must be longer than or equal to 8 characters',
  //             'localBusinessId must be shorter than or equal to 50 characters',
  //             'localBusinessId must be a string',
  //             'name must be shorter than or equal to 50 characters',
  //             'name must be a string',
  //             'email must be an email',
  //             'phone must be longer than or equal to 6 characters',
  //             'phone must be a string',
  //             'password must be longer than or equal to 8 characters',
  //             'password must be a string',
  //             'Passwords should match',
  //             'passwordConfirmation must be longer than or equal to 8 characters',
  //             'passwordConfirmation must be a string',
  //           ],
  //           error: 'Bad Request',
  //         });
  //     });
  //   });
  // });

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