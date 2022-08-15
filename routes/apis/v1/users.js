const express = require('express');
const router = express.Router();
const { StatusCodes } = require('http-status-codes');
const errorHandler = require('http-errors');
const db = require('../../../models/index');
const RouterProtection = require('../../../helpers/RouterProtection');
const { User } = db;

router.get('/', RouterProtection.verify, async (req, res, next) => {
    try {
        const users = await User.findAll();
        const response = users.map(user => {
            const { password, ...data } = user.toJSON();
            return data;
        });

        res.json(response)
    } catch (error) {
        next(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error));
    }
});

router.get('/:id', RouterProtection.verify, async (req, res, next) => {
    try {
        if (!req.params.id) {
            return next(errorHandler(StatusCodes.BAD_REQUEST, 'Id must be defined'));
        }

        const user = await User.findByPk(req.params.id);

        if (!user) {
            return next(errorHandler(StatusCodes.NOT_FOUND, 'No user found'));
        }

        const { password, ...data } = user.toJSON();

        res.json(data);
    } catch (error) {
        next(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error));
    }
});

router.post('/', async (req, res, next) => {
    try {
        const user = await User.create({
            username: req.body.username,
            password: req.body.password,
            user_email: req.body.user_email
        });
        const { password, ...data } = user.toJSON();

        res.status(StatusCodes.CREATED)
            .json(data);
    } catch (error) {
        next(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error));
    }
});

router.put('/:id', RouterProtection.verify, async (req, res, next) => {
    try {
        if (!req.params.id) {
            return next(errorHandler(StatusCodes.BAD_REQUEST, 'Id must be defined'));
        }

        if (!req.body.user_email) {
            return next(errorHandler(StatusCodes.BAD_REQUEST, 'Email must be defined'));
        }

        const user = await User.findByPk(req.params.id);

        if (!user) {
            return next(errorHandler(StatusCodes.NOT_FOUND, 'No user found'));
        }

        user.user_email = req.body.user_email;
        await user.save();

        res.json({ result: true });
    } catch (error) {
        next(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error));
    }
});

router.delete('/:id', RouterProtection.verify, async (req, res, next) => {
    try {
        if (!req.params.id) {
            return next(errorHandler(StatusCodes.BAD_REQUEST, 'Id must be defined'));
        }

        await User.destroy({
            where: {
                id: req.params.id
            }
        });

        res.json({
            result: true
        });
    } catch (error) {
        next(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error));
    }
});


module.exports = router;
