FROM node:19.9.0-alpine as builder

RUN apk add --no-cache libc6-compat

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY tsconfig.json ./
COPY prisma/schema.prisma ./prisma/

RUN npx prisma generate

COPY . .

RUN npm run build

RUN ls -a

EXPOSE 80
ENV PORT 80

CMD ["npm","start"]