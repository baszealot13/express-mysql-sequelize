const routes = require('express').Router();
const userRoute = require('./users');
const helloRoute = require('./hello');
const loginRoute = require('./login');

routes.use('/users', userRoute);
routes.use('/login', loginRoute);
routes.use('/', helloRoute)

module.exports = routes;
