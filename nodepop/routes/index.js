var express = require('express');
var router = express.Router();
//const AdNopop = require('../models/AdNodepop');
const adsRouter = require('./api/mainList');
const tagsRouter = require('./api/tags');



//Router to get the main list:
router.use('/', adsRouter);
// Router to get the tags list:
router.use('/tags', tagsRouter);

module.exports = router;
