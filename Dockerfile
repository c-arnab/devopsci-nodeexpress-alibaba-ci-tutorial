FROM node:10.16-alpine
ENV NODE_ENV production
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
USER node
RUN npm install --production --silent && mv node_modules ../
COPY --chown=node:node . .
EXPOSE 3000
CMD npm start
