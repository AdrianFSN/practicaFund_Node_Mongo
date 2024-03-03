'use strict'

var express = require('express');
var router = express.Router();
const AdNopop = require('../../models/AdNodepop');
const { query, param, validationResult } = require('express-validator');
//const fs = require('fs');
const RetrieverAds = require('../../models/RetrieveAds')



// GET /api/adsNodepop
// Returns the whole list of ads
router.get('/', async function (req, res, next) {

    try {
        const adsList = await RetrieverAds.retrieveAds(req);
        res.json({ results: adsList });

    } catch (error) {
        next(error);
    };
});

// GET /api/adsNodepop/<_id>
// Returns a single ad (specified by id)
router.get('/:id', [
    param('id').isMongoId().withMessage('The ID you introduced does not exist or is not in a valid format.')
],
    async (req, res, next) => {
        try {
            validationResult(req).throw();

            const id = req.params.id;
            const oneAd = await AdNopop.findById(id);
            res.json({ result: oneAd });
        } catch (error) {
            next(error);
        }
    });

module.exports = router;