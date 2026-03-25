FROM node:22-alpine AS builder
# create directory app
WORKDIR /app
# install pnpm
RUN npm install -g pnpm
# copy package and pnpm-lock.yml
COPY package.json pnpm-lock.ymal ./
# install dependecies
RUN pnpm install
# copy all to /app
COPY . .
# Run and build project
RUN pnpm run build

## Runtime  ##
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

# Phnom Penh Timezone
ENV TZ=Asia/Phnom_Penh 
EXPOSE 5092

# daemon off = no run in background 
CMD ["nginx","-g","daemon off;"]