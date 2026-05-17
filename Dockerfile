FROM node:22-alpine AS builder
# create directory app
WORKDIR /app

# avoid script error
ENV CI=true
# copy package and pnpm-lock.yml
COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm
# install dependecies
RUN pnpm install

# copy all to /app
COPY . .
# Run and build project
ARG MODE=dev
RUN pnpm run build -- --mode=${MODE}

## Runtime  ##
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 7003

# daemon off = no run in background 
CMD ["nginx","-g","daemon off;"]