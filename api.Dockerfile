FROM node:17-alpine3.14 as builder
WORKDIR /app
COPY dist/apps/api/package*.json .
RUN npm install -g pnpm
RUN pnpm install --production
RUN pnpm install reflect-metadata tslib rxjs @nestjs/platform-express
RUN ls


FROM node:17-alpine3.14
WORKDIR /app
COPY dist/apps/api .
COPY --from=builder /app/node_modules ./node_modules
RUN ls
EXPOSE 3000
CMD ["node", "main.js"]
