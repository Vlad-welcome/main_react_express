FROM node:24-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

# В Alpine нет пользователя `node` по умолчанию, создаем его
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

CMD ["node", "src/server.js"]