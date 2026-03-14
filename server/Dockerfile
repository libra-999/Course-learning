## Build Stage ##
FROM node:22-alpine as Builder
WORKDIR /app
RUN npm install -g pnpm

COPY package.json pnpm-lock.yml ./
RUN pnpm install

COPY . .
RUN pnpm run build

## Runtime ##
FROM node:22-alpine
WORKDIR /app
RUN npm install -g pnpm

COPY --from=Builder /app/dist ./dist
COPY --from=Builder /app/package.json ./

EXPOSE 9800
CMD ["node", " dist/main.js"]