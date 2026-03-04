FROM node:22-alpine
WORKDIR /app/server
RUN npm install -g pnpm

COPY package.json pnpm-lock.yml ./
RUN pnpm install
COPY . .
EXPOSE 9800
CMD ["pnpm", "run" , "dev"]