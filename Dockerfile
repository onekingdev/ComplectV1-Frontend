FROM node:14.17.6-alpine
RUN apk update && apk upgrade

WORKDIR /home/app
RUN npm i -g @vue/cli
COPY package.json ./
RUN npm i