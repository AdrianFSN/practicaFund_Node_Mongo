'use strict';
const AdNopop = require('./AdNodepop');
/* const { query, param, validationResult } = require('express-validator');
const fs = require('fs'); */

class AdsRetriever {
    static async retrieveAds(req) {
        try {

            //validationResult(req).throw();

            const filterByTag = req.query.tag ? req.query.tag.toLowerCase() : req.query.tag;
            const filterByName = req.query.name ? req.query.name.toLowerCase() : req.query.name;;
            const filterByOnSale = req.query.sale ? req.query.sale.toLowerCase() : req.query.sale;
            const filterByPrice = req.query.price;

            //paging
            const skip = req.query.skip;
            const limit = req.query.limit;

            //ordering
            const sort = req.query.sort;
            //fields selection
            const fields = req.query.fields ? req.query.fields.toLowerCase() : req.query.fields;

            const filter = {};

            if (filterByTag) {
                filter.tag = filterByTag;
            }
            if (filterByName) {
                filter.name = new RegExp('^' + filterByName, "i");
            }
            if (filterByOnSale) {
                filter.sale = filterByOnSale;
            }
            if (filterByPrice) {
                filter.price = filterByPrice;
            }
            const adsList = await AdNopop.listCriterias(filter, skip, limit, sort, fields); // he cambiado find por listCriterias
            return { results: adsList };

        } catch (error) {
            throw error;
        };
    }
}

module.exports = AdsRetriever;