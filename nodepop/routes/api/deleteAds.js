var express = require('express');
var router = express.Router();
const AdNopop = require('../../models/AdNodepop');

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