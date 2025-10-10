FROM node:24.10.0-alpine3.22
WORKDIR /app
COPY package.json .
RUN npm install --omit=dev
COPY . .
CMD [ "npm","start" ]