FROM node:14
WORKDIR /app
COPY package.json /app
COPY package-lock.json /app
COPY yarn.lock /app
# RUN npm install -g yarn
RUN yarn
COPY . /app
