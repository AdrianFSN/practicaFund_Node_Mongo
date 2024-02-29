var express = require('express');
var router = express.Router();
//const AdNopop = require('../models/AdNodepop');
const adsRouter = require('./mainList');
const tagsRouter = require('./tags');



//Router to get the main list:
router.use('/', adsRouter);
// Router to get the tags list:
router.use('/', tagsRouter);

module.exports = router;
