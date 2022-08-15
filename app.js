const express = require('express');
const path = require('path');
const http = require('http');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

let env = process.env.NODE_ENV || 'production';
let dotEnv = '.env';

if (env === 'development') {
    dotEnv = '.dev-env';
}

require('dotenv').config({ path: `./${dotEnv}` });

const apiRoutesV1 = require('./routes/apis/v1');
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// app.use('/api/v1', apiRoutesV1);
app.get("/", function (req, res) {
    res.send("Hello World!")
})
// const server = http.createServer(app);
server.listen(process.env.HTTP_PORT || 3000, () => {
// app.listen(process.env.HTTP_PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.HTTP_PORT}`);
});

server.on('error', (error) => {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    console.log('error ', error);
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
})

