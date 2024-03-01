const express = require('express');
const router = express.Router();
const AdNopop = require('../models/AdNodepop');

// GET /tags
//Compile an array of used tags
router.get('/', async function (req, res, next) {
    try {
        const tagsList = await AdNopop.distinct("tag");
        res.render('tags', { tags: tagsList });
        //res.json({ results: tagsList });

    } catch (error) {
        next(error);
    };
});

module.exports = router;