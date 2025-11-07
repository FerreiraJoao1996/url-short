import { HttpStatus, INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import request from 'supertest';
import { App } from "supertest/types";
import { AppModule } from "../../src/app.module";

describe("Create and consume a short url", () => {
    let app: INestApplication<App>;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule]
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    const url = "https://youtube.com/";
    let shortUrl = "";

    it("Should be able to create a short url", async () => {
        const response = await request(app.getHttpServer())
            .post("/url/")
            .send({ url: url })

        expect(response.status === HttpStatus.OK || response.status === HttpStatus.CREATED).toBeTruthy();
        expect(response.body.url).toBeDefined();
        expect(response.body.url.short_url).toBeDefined();
        expect(response.body.url.original_url).toBe(url);
        expect(response.body.shortenedUrl).toBeDefined();

        shortUrl = response.body.url.short_url;
    });

    it("Shortened url should redirect to the correct long url", async () => {
        const short = shortUrl
        const response = await request(app.getHttpServer())
            .get(`/${short}`)
            .expect(HttpStatus.TEMPORARY_REDIRECT);

        expect(response.headers.location).toBe(url);
    });
});