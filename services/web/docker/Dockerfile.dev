FROM node:12

WORKDIR /app

COPY package*.json /app/
RUN npm install

COPY . /app

RUN npm run build
EXPOSE 80
EXPOSE 3000
EXPOSE 49153

CMD ["npm", "run", "dev"]