'use strict'
var express = require('express');
var router = express.Router();
//const AdNopop = require('../models/AdNodepop');
//const { query, validationResult } = require('express-validator');
//const fs = require('fs');
const RetrieverAds = require('../models/RetrieveAds');

/* GET home page. */
router.get('/', async function (req, res, next) {

    try {
        const adsList = await RetrieverAds.retrieveAds(req);
        res.render('index', { title: 'Nodepop', adsList: adsList.results });

    } catch (error) {
        next(error);
    };
});

module.exports = router;