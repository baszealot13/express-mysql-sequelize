const routes = require('express').Router();
const userRoute = require('./users');
const helloRoute = require('./hello');
const loginRoute = require('./login');
const RouterProtection = require('../../../helpers/RouterProtection');

routes.use('/users', RouterProtection.verify, userRoute);
routes.use('/login', loginRoute);
routes.use('/', helloRoute)

module.exports = routes;
