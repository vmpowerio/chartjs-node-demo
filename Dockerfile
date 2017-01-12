FROM node:5
RUN apt-get update
RUN apt-get install libcairo2-dev libpango1.0-dev libgif-dev libjpeg62-turbo-dev build-essential g++ -y
ADD . ./
RUN npm install
RUN npm install grunt-cli -g
RUN npm install bower -g
RUN bower install --allow-root
RUN grunt build
ADD . ./
EXPOSE 3000
CMD node ./bin/www
