FROM node:18.17 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM httpd:2.4 AS deploy

WORKDIR /usr/local/apache2/htdocs/

COPY --from=build /app/dist/ .
