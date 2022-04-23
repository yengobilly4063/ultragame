FROM node:14-alpine As development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=development

COPY . .

RUN npm run build

FROM node:14-alpine As production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
ENV MYSQL_HOST=ultragame-db
ENV MYSQL_PORT=3306
ENV MYSQL_USERNAME=root
ENV MYSQL_PASSWORD=BiLmmC39HnHQV7Fbj5MG-67d6MF
ENV MYSQL_DATABASE=ultragame

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]