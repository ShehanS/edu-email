FROM node:latest

COPY . /EMAIL-SENDER

WORKDIR /EMAIL-SENDER

RUN npm install --production

EXPOSE 8086

CMD ["node","index.js"]