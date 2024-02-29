var express = require('express');
var router = express.Router();
const AdNopop = require('../models/AdNodepop');
const { query, validationResult } = require('express-validator');

/* GET home page. */
router.get('/',

    [
        query('name').optional().notEmpty().withMessage('At least one character is needed to search by name'),
        query('onSale').optional().custom(value => {
            const valueToBoolean = Boolean(value);

            if (valueToBoolean === true || valueToBoolean === false) {
                return true;
            }

        }).withMessage('On sale can only be "true" or "false"'),

        query('tag').optional().custom(value => {
            const valueToLowerCase = value.toLowerCase();
            const availableTags = ['lifestyle', 'mobile', 'motor', 'work'];

            if (availableTags.includes(valueToLowerCase))
                return true;
        }
        ).withMessage('Tag can only be "Lifestyle", "Mobile", "Motor" or "Work"'),
        query('price').optional().isNumeric().withMessage('Price can not be empty and should be a number')
    ],

    async function (req, res, next) {
        try {

            validationResult(req).throw();

            // filters
            const filterByTag = req.query.tag ? req.query.tag.toLowerCase() : req.query.tag;
            const filterByName = req.query.name;
            const filterByOnSale = req.query.onSale ? req.query.onSale.toLowerCase() : req.query.onSale;
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
        };
    });

module.exports = router;