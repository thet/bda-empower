# build stage
FROM node:lts-alpine as build-stage
RUN npm install -g yarn
WORKDIR /app-build
COPY yarn.lock ./
COPY package.json ./
RUN yarn install
COPY . .
RUN yarn build

# production stage
FROM node:lts-alpine as production-stage
RUN apk add --no-cache --virtual .run-deps \
    bash
RUN npm install -g http-server
WORKDIR /app
COPY --from=build-stage /app-build/dist /app
EXPOSE 8080
CMD [ "http-server", "." ]
