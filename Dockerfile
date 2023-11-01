FROM node:18
RUN mkdir -p /app
WORKDIR /app
COPY . .
RUN npm i
RUN npm cache clean --force
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]