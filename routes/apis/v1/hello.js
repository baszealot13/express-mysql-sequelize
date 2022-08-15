var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.send('Hello world, I\m fine');
});

module.exports = router;
