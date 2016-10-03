FROM node:latest
MAINTAINER audibleblink & cen10

RUN apt-get update && \
    apt-get install -y git-core sudo && \
    git clone git://git.drogon.net/wiringPi && \
    cd wiringPi && \
    git pull origin && \
    ./build

ADD app.js app.js
ADD package.json package.json
RUN npm install
ENTRYPOINT ["npm", "start"]
