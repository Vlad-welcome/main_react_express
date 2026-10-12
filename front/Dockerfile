# --- Этап 1: сборка React ---
FROM node:24-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# --- Этап 2: Caddy + статика ---
FROM caddy:2.11-alpine

COPY --from=builder /app/dist /srv

EXPOSE 80 443

CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile", "--adapter", "caddyfile"]