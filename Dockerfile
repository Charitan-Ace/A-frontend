# https://static-web-server.net/features/docker

FROM node:20-slim AS base
ARG VITE_APP_API_URL
ENV VITE_APP_API_URL=$VITE_APP_API_URL
RUN corepack enable
COPY . /app
WORKDIR /app

FROM base AS build
RUN --mount=type=cache,target=/usr/local/share/.cache/yarn yarn install --frozen-lockfile
RUN yarn build

FROM joseluisq/static-web-server:2
COPY --from=build /app/dist /app/public
WORKDIR /app

CMD ["--page-fallback", "/app/public/index.html"]
