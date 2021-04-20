FROM node:15.14.0-alpine3.10

RUN apk update
RUN apk add git

ENV PROJECT_DIR="/usr/app"

RUN rm -rf ./node_modules


ADD src PROJECT_DIR/src
ADD data PROJECT_DIR/data

RUN ls -lha

ADD ./package.json PROJECT_DIR
ADD ./package-lock.json PROJECT_DIR
ADD ./tsconfig.json PROJECT_DIR
ADD ./.snyk PROJECT_DIR

WORKDIR PROJECT_DIR

EXPOSE 5000

RUN npm prune
RUN npm install


ENTRYPOINT [ "npm", "run", "start" ]
CMD ["sh" ]