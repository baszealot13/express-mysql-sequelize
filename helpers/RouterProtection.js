const errorHandler = require('http-errors');
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');

class RouterProtection {
    static async verify(req, res, next) {
        try {
            const auth = req.headers.authorization || req.headers.Authorization;
            const token = auth.split(' ')[1];
            const claims = jwt.verify(token, process.env.TOKEN_SECRET);

            return next();
        } catch (error) {
            return next(errorHandler(StatusCodes.UNAUTHORIZED, error));
        }
    }
}
module.exports = RouterProtection