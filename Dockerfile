FROM node:current-alpine as builder
WORKDIR /my-space

ARG db

COPY package.json package-lock.json ./
RUN npm ci
COPY . .

ENV DATABASE_URL=$db

RUN npx prisma generate

RUN npm run build

FROM node:current-alpine as runner
WORKDIR /my-space
COPY --from=builder /my-space/package.json .
COPY --from=builder /my-space/package-lock.json .
COPY --from=builder /my-space/next.config.js ./
COPY --from=builder /my-space/public ./public
COPY --from=builder /my-space/.next/standalone ./
COPY --from=builder /my-space/.next/static ./.next/static
EXPOSE 3000
ENTRYPOINT ["npm", "start"]