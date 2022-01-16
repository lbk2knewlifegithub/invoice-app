FROM node:17-alpine3.14 as builder
WORKDIR /app
COPY ./dist/apps/api .

EXPOSE 3000

RUN npm install -g pnpm
RUN pnpm install --production

# dependencies that nestjs needs
RUN pnpm install reflect-metadata tslib rxjs @nestjs/platform-express

FROM node:17-alpine3.14
WORKDIR /app
COPY --from=builder /app .
COPY --from=builder /app/node_modules ./node_modules
CMD node ./main.js
