FROM node:9.1-alpine
LABEL maintainer="Alexi Taylor"
# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
CMD [ "npm", "run", "serve" ]
# Create a dedicated user
RUN addgroup -S server && adduser -S -g nodejs server
# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install
# unknown is the default, but you can override it with --build-arg APP_VERSION=0.0.1 during docker build
ARG APP_VERSION=unknown
ENV APP_VERSION $APP_VERSION
# production is the default, but you can override it with --build-arg NODE_ENV=development during docker build
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV
# unknown is the default, but you can override it with --build-arg RELEASE_DATE=$(date +"%Y/%m/%d") during docker build
ARG RELEASE_DATE=unknown
LABEL com.your-app.author="Alexi Taylor" \
      com.your-app.release-date=$RELEASE_DATE \
      com.your-app.release-version=$APP_VERSION
# Bundle app source
COPY . /usr/src/app
# Build the built version
RUN npm run build
# Remove dev packages
RUN npm prune --production
# Use node user
USER server
