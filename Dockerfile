FROM node:12.16.1
RUN mkdir -p pizzaapp-pyco
WORKDIR /pizzaapp-pyco
COPY build src
COPY migrations migrations
COPY package.json .
COPY .env .
COPY mongoObjectIdSeeds.js .
COPY migrate-mongo-config.js .
RUN ls -l .
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]