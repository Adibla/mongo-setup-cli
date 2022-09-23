FROM node:lts-alpine

WORKDIR /app

RUN chown -R node:node /app

USER node

COPY package.json package.json

RUN npm i --production

COPY config config
COPY priv priv
COPY src src
COPY bin bin
COPY .husky .husky

CMD ["node", "bin/index.ts"]