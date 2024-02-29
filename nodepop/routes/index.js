var express = require('express');
var router = express.Router();
//const AdNopop = require('../models/AdNodepop');
const adsRouter = require('./mainList');


router.use('/', adsRouter);

module.exports = router;
