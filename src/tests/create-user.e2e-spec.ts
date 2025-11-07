import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../app.module';

describe('Users E2E', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    const randomUser = {
        name: 'João',
        lastname: 'Ferreira',
        email: `joao${Date.now()}@example.com`,
        password: '123456',
        confirmPassword: '123456',
    };

    it('should create a user', async () => {
        const userData = {
            name: randomUser.name,
            lastname: randomUser.lastname,
            email: randomUser.email,
            password: randomUser.password,
            confirmPassword: randomUser.confirmPassword,
        };

        const response = await request(app.getHttpServer())
            .post('/users')
            .send(userData)
            .expect(HttpStatus.CREATED);

        expect(response.body).toMatchObject({
            name: randomUser.name,
            email: randomUser.email,
        });
    });

    afterAll(async () => {
        await app.close();
    });


    it("Should be able to log with it", async () => {
        const response = await request(app.getHttpServer()).post("/auth/login").send({
            email: randomUser.email,
            password: randomUser.password
        });

        expect(
            response.status === HttpStatus.OK ||
            response.status === HttpStatus.CREATED
        ).toBeTruthy();
        expect(response.body.access_token).toBeDefined();
    });
});
