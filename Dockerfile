FROM node:10.15.3-alpine

COPY . /app
WORKDIR /app

RUN npm install
RUN npm install -g pm2

COPY . ./

EXPOSE 3000
EXPOSE 9200

CMD npm run start