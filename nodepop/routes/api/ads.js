var express = require('express');
var router = express.Router();
const AdNopop = require('../../models/AdNodepop');

// GET /api/adsNodepop
// Returns the whole list of ads
router.get('/', async function (req, res, next) {
    // Sample: http://127.0.0.1:3001/api/adsNodepop?price=500
    try {
        const filterByTag = req.query.tag;
        const filterByName = req.query.name;
        const filterByOnSale = req.query.onSale;
        const filterByPrice = req.query.price;

        // Paging
        // Sample http://127.0.0.1:3001/api/adsNodepop?skip=2&limit=2
        const skip = req.query.skip;
        const limit = req.query.limit;

        // Ordering
        // Sample http://127.0.0.1:3001/api/adsNodepop?skip=2&limit=2&sort=price
        // Sample http://127.0.0.1:3001/api/adsNodepop?sort=price
        // Sample http://127.0.0.1:3001/api/adsNodepop?sort=-price
        // Sample http://127.0.0.1:3001/api/adsNodepop?sort=-price%20name
        const sort = req.query.sort;

        // Fields selection
        // Sample http://127.0.0.1:3001/api/adsNodepop?fields=name
        const fields = req.query.fields;


        const filter = {};

        if (filterByTag) {
            filter.tag = filterByTag;
        }
        if (filterByName) {
            filter.name = filterByName;
        }

        if (filterByOnSale) {
            filter.onSale = filterByOnSale;
        }
        if (filterByPrice) {
            filter.price = filterByPrice;
        }

        const adsList = await AdNopop.listCriterias(filter, skip, limit, sort, fields); // he cambiado find por listCriterias
        res.json({ results: adsList });
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
        res.json({ result: oneAd });

    } catch (error) {
        next(error);
    }
});

// PUT /api/adsNodepop/<_id> (body)
// updates an ad
router.put('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const updatedAd = await AdNopop.findByIdAndUpdate(id, data, { new: true });

        res.json({ result: updatedAd });

    } catch (error) {
        next(error);
    };
})

// POST /api/adsNodepop (body)
// Insert a new add
router.post('/', async (req, res, next) => {
    try {
        const data = req.body;

        // Save an instance of the ad in memory
        const newAd = new AdNopop(data);
        // Then persist (save) in the DB
        const insertedNewAd = await newAd.save();
        res.json({ result: insertedNewAd });
    } catch (error) {
        next(error);
    };
})

// DELETE /api/adsNodepop/<_id>
// Eliminates an ad
router.delete('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        await AdNopop.deleteOne({ _id: id });
        res.json(); // No message. If answer is 200 OK in Postman, it went well.
    } catch (error) {
        next(error);
    };
});

module.exports = router;