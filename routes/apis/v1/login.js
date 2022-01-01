const express = require('express');
const router = express.Router();
const { StatusCodes } = require('http-status-codes');
const errorHandler = require('http-errors');
const db = require('../../../models/index');
const { User } = db;
const jwt = require('jsonwebtoken');

router.post('/', async (req, res, next) => {
    try{
        if (!req.body.username) {
            return next(errorHandler(StatusCodes.BAD_REQUEST, 'Username must be definded'));
        }

        if (!req.body.password) {
            return next(errorHandler(StatusCodes.BAD_REQUEST, 'Password must be definded'));
        }

        const user = await User.findOne({
            where: { username: req.body.username }
        });

        if (!user) {
            return next(errorHandler(StatusCodes.NOT_FOUND, 'No user found'));
        }

        if (!user.passwordCheck(req.body.password)) {
            return next(errorHandler(StatusCodes.UNAUTHORIZED, 'Invalid Credential'));
        }

        const token = jwt.sign({ userId: user.id }, process.env.TOKEN_SECRET);
        const { password, ...data } = user.toJSON();

        return res.json({
            token: token,
            user: data
        });
    }catch (error) {
        return next(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error));
    }
});

module.exports = router;