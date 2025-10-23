FROM node:22.9.0-alpine AS build

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm@9
RUN pnpm install --frozen-lockfile

COPY . .

ARG DATABASE_URL
RUN if [ -n "${DATABASE_URL}" ]; then echo "DATABASE_URL=${DATABASE_URL}" >> .env; fi

RUN pnpm exec prisma generate && pnpm exec next build

FROM node:22.9.0-alpine AS production

WORKDIR /app

COPY --from=build /app/package.json ./
COPY --from=build /app/pnpm-lock.yaml ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/prisma ./prisma

ENV NODE_ENV=production

EXPOSE 3000

CMD ["npm", "start"]