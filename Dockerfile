FROM node:22.9.0-alpine AS build

WORKDIR /app

COPY . .

RUN npm install

ARG DATABASE_URL
RUN echo "DATABASE_URL=${DATABASE_URL}" >> .env

RUN npm run build

FROM node:22.9.0-alpine AS production

WORKDIR /app

COPY --from=build /app/package.json ./
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/prisma ./prisma

RUN npm install
RUN npm install sharp

EXPOSE 3000

CMD ["npm", "start"]