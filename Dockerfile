FROM node:18

WORKDIR /usr/src/app

COPY . .

WORKDIR /usr/src/app/FRONTEND
RUN npm i
RUN npm run build

WORKDIR /usr/src/app/BACKEND
RUN npm i

EXPOSE 3001

CMD ["node", "app.js"]