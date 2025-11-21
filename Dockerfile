FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

# App Runner expects a listening port
ENV PORT=3000

CMD ["npm", "start"]