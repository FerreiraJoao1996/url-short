FROM node:24-alpine AS builder

WORKDIR /url-short

COPY package*.json ./

RUN npm install

COPY . .

RUN npm rebuild esbuild
RUN npm run build

FROM node:24-alpine AS runner

WORKDIR /url-short

COPY --from=builder /url-short/dist ./dist
COPY --from=builder /url-short/package*.json ./

RUN npm install --omit=dev

EXPOSE 3000

CMD ["node", "dist/main.js"]
