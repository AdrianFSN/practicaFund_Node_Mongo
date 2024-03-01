const express = require('express');
const router = express.Router();
const AdNopop = require('../../models/AdNodepop');

// GET /tags
//Compile an array of used tags
router.get('/', async function (req, res, next) {
    try {
        const tagsList = await AdNopop.distinct("tag");
        console.log('Esto es tagsList', tagsList)
        res.json({ result: tagsList });
        //res.render('tags', { tags: tagsList });

    } catch (error) {
        next(error);
    };
});

// GET /api/adsNodepop/<_id>
// Returns a single ad (specified by id)
router.get('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const oneAd = await AdNopop.findById(id);
        console.log('Esto es oneAd', oneAd)

        res.json({ result: oneAd });
    } catch (error) {
        next(error);
    }
});

// GET /api/adsNodepop
// Returns the whole list of ads
router.get('/', async function (req, res, next) {

    try {

        const fields = req.query.fields;

        const etiquetasList = await AdNopop.listCriterias(fields); // he cambiado find por listCriterias
        res.json({ results: etiquetasList });

    } catch (error) {
        next(error);
    };
});


module.exports = router;