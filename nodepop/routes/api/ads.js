var express = require('express');
var router = express.Router();
const AdNopop = require('../../models/AdNodepop');

// GET /api/adsNodepop
// Devuelve la lista de anuncios
router.get('/', async function (req, res, next) {
    // ejemplo de filtro en Postman: http://127.0.0.1:3001/api/adsNodepop?price=500
    try {
        const filterByTag = req.query.tag;
        const filterByName = req.query.name;
        const filterByOnSale = req.query.onsSale;
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

        const adsList = await AdNopop.listar(filter, skip, limit, sort, fields); // he cambiado find por listar
        res.json({ results: adsList });
    } catch (error) {
        next(error);
    };
});

// GET /api/adsNodepop/<_id>
// Devuelve un solo anuncio
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
// actualiza un anuncio
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
// Insertar un anuncio nuevo
router.post('/', async (req, res, next) => {
    try {
        const data = req.body;

        // primero guardamos una instancia de anuncio en memoria
        const newAd = new AdNopop(data);
        // Después lo persistimos (guardamos) en la BD
        const insertedNewAd = await newAd.save();
        res.json({ result: insertedNewAd });
    } catch (error) {
        next(error);
    };
})

// DELETE /api/adsNodepop/<_id>
// Elimina un anuncio
router.delete('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        await AdNopop.deleteOne({ _id: id });
        res.json(); // sin más, porque al haber borrado, con que la respuesta sea un 200, todo habrá ido bien.

    } catch (error) {
        next(error);
    };
});

module.exports = router;