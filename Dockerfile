FROM oven/bun

WORKDIR /app

COPY package.json .
COPY bun.lockb .

RUN bun install --production

COPY index.ts .
COPY api api
COPY tsconfig.json .
# COPY public public

ENV NODE_ENV production
CMD ["bun", "index.ts"]

EXPOSE 3000