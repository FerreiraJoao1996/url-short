FROM node:24-alpine AS builder

WORKDIR /url-short

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

FROM node:24-alpine AS runner

WORKDIR /url-short

COPY --from=builder /url-short/dist ./dist
COPY --from=builder /url-short/src ./src
COPY --from=builder /url-short/package.json ./
COPY --from=builder /url-short/yarn.lock ./
COPY --from=builder /url-short/config ./config
COPY --from=builder /url-short/src/database/migrations ./src/database/migrations
COPY --from=builder /url-short/src/tests ./src/tests
COPY --from=builder /url-short/jest-e2e.config.ts ./
COPY --from=builder /url-short/tsconfig.json ./tsconfig.json

RUN yarn install --frozen-lockfile && yarn add ts-node jest @types/jest supertest --dev

EXPOSE 3000

CMD ["node", "dist/main.js"]
