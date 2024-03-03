'use strict';
const AdNopop = require('./AdNodepop');
const { query, param, validationResult } = require('express-validator');
const fs = require('fs');

class AdsRetriever {
    static async retrieveAds(req) {
        try {
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

            await Promise.all(
                [
                    query('name').optional().notEmpty().withMessage('At least one character is needed to search by name'),
                    query('sale').optional().custom(value => {
                        const valueToBoolean = Boolean(value);

                        if (valueToBoolean === true || valueToBoolean === false) {
                            return true;
                        }

                    }).withMessage('On sale can only be "true" or "false"'),
                    query('tag').optional().custom(value => {
                        const valueToLowerCase = value.toLowerCase();
                        const jsonTagsList = fs.readFileSync('./data/tagsList.json', 'utf-8');
                        const tagsList = JSON.parse(jsonTagsList);
                        const availableTags = tagsList.results;

                        if (availableTags.includes(valueToLowerCase))
                            return true;
                    }
                    ).withMessage('Tag can only be "lifestyle", "mobile", "motor" or "work"'),
                    query('price').optional().isNumeric().withMessage('Price can not be empty and should be a number'),
                    query('skip').optional().isNumeric().withMessage('Skip can not be empty and should be a number'),
                    query('limit').optional().isNumeric().withMessage('Limit can not be empty and should be a number'),
                    query('fields').optional().custom(value => {
                        const valueToLowerCase = value.toLowerCase();
                        const jsonKeysList = fs.readFileSync('./data/keysList.json', 'utf-8');
                        const keysList = JSON.parse(jsonKeysList);
                        const availableKeys = keysList.results;

                        if (availableKeys.includes(valueToLowerCase))
                            return true;
                    }
                    ).withMessage('You can only filter by "name", "sale", "price" or "tag"'),
                    query('sort').optional().custom(value => {
                        if (value.startsWith('-')) {
                            value = value.slice(1)
                        }
                        const jsonKeysList = fs.readFileSync('./data/keysList.json', 'utf-8');
                        const keysList = JSON.parse(jsonKeysList);
                        const availableKeys = keysList.results;

                        if (availableKeys.includes(value))
                            return true;
                    }
                    ).withMessage('You can only sort by "name", "sale", "price" or "tag"')
                ]
            )
            validationResult(req).throw();

            const adsList = await AdNopop.listCriterias(filter, skip, limit, sort, fields); // he cambiado find por listCriterias
            return { results: adsList };

        } catch (error) {
            throw error;
        };
    }
}

module.exports = AdsRetriever;