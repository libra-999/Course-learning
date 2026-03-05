FROM node:22-alpine AS build
# create directory app
WORKDIR /app
# install pnpm
RUN npm install -g pnpm
# copy package and pnpm-lock.yml
COPY package.json ./
# install dependecies
RUN pnpm install
# copy all to /app
COPY . .
# Run and build project
RUN pnpm run build


FROM node:22-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/dist ./dist
EXPOSE 5092
CMD ["serve", "-s", "dist", "-l", "5092"]