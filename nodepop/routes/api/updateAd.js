var express = require('express');
var router = express.Router();
const AdNopop = require('../../models/AdNodepop');
const { query, validationResult } = require('express-validator');

// PUT /api/adsNodepop/update/<_id> (body)
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
});

module.exports = router;