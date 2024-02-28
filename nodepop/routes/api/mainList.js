var express = require('express');
var router = express.Router();
const AdNopop = require('../../models/AdNodepop');

/* GET home page. */
router.get('/', async function (req, res, next) {
    try {
        // filters
        const filterByTag = req.query.tag;
        const filterByName = req.query.name;
        const filterByOnSale = req.query.onSale;
        const filterByPrice = req.query.price;

        //paging
        const skip = req.query.skip;
        const limit = req.query.limit;

        //ordering
        const sort = req.query.sort;

        //fields selection
        const fields = req.query.fields;

        const filter = {};

        if (filterByTag) {
            filter.tag = filterByTag;
        }
        if (filterByName) {
            filter.name = new RegExp('^' + filterByName, "i");
        }
        if (filterByOnSale) {
            filter.onSale = filterByOnSale;
        }
        if (filterByPrice) {
            filter.price = filterByPrice;
        }

        const adsList = await AdNopop.listCriterias(filter, skip, limit, sort, fields);
        res.render('index', { title: 'Nodepop', adsList: adsList });

    } catch (error) {
        next(error);
    }
});

module.exports = router;