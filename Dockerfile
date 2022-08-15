FROM node:14.5.0-alpine
WORKDIR /app
COPY package.json .
RUN apk add --no-cache make gcc g++ python && \
    npm install && \
    npm rebuild bcrypt --build-from-source && \
    apk del make gcc g++ python
COPY . .
# EXPOSE 8080
CMD ["npm", "run", "start"]
