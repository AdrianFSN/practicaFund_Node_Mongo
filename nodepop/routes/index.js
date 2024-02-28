var express = require('express');
var router = express.Router();
const AdNopop = require('../models/AdNodepop');

/* GET home page. */
router.get('/', async function (req, res, next) {
  try {
    const filterByTag = req.query.tag;
    const filterByName = req.query.name;
    const filterByOnSale = req.query.onSale;
    const filterByPrice = req.query.price;

    //paginación
    //http://127.0.0.1:3001/api/adsNodepop?skip=2&limit=2
    const skip = req.query.skip;
    const limit = req.query.limit;
    //ordenación
    //http://127.0.0.1:3001/api/adsNodepop?skip=2&limit=2&sort=price
    //http://127.0.0.1:3001/api/adsNodepop?sort=price
    //http://127.0.0.1:3001/api/adsNodepop?sort=-price
    //http://127.0.0.1:3001/api/adsNodepop?sort=-price name
    const sort = req.query.sort;
    //fields selection
    //http://127.0.0.1:3001/api/adsNodepop?fields=name
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

    const adsList = await AdNopop.listCriterias(filter, skip, limit, sort, fields);
    console.log(adsList);
    res.render('index', { title: 'Nodepop', adsList: adsList });

  } catch (error) {
    next(error);
  }
});



module.exports = router;
