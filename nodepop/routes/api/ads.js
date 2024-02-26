var express = require('express');
var router = express.Router();
const AdNopop = require('../../models/AdNodepop');

// GET /api/adsNodepop
// Devuelve una lista de anuncios
router.get('/', async function (req, res, next) {
    // ejemplo de filtro en Postman: http://127.0.0.1:3000/api/agentes?age=35
    try {
        const filterByTag = req.query.tag;
        const filterByName = req.query.name;
        const filterByOnSale = req.query.onsSale;
        const filterByPrice = req.query.price;
        const filterByPicture = req.query.picture;

        //paginación
        //http://127.0.0.1:3000/api/agentes?skip=2&limit=2
        const skip = req.query.skip;
        const limit = req.query.limit;
        //ordenación
        //http://127.0.0.1:3000/api/agentes?skip=2&limit=2&sort=age
        //http://127.0.0.1:3000/api/agentes?sort=age
        //http://127.0.0.1:3000/api/agentes?sort=-age
        //http://127.0.0.1:3000/api/agentes?sort=-age name
        const sort = req.query.sort;
        //fields selection
        //http://127.0.0.1:3000/api/agentes?fields=name
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
        if (filterByPicture) {
            filter.price = filterByPicture;
        }

        const adsList = await AdNopop.listar(filter, skip, limit, sort, fields); // he cambiado find por listar
        res.json({ results: adsList });
    } catch (error) {
        next(error);
    };
});

// GET /api/agentes/<_id>
// Devuelve un agente
router.get('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const agente = await AdNopop.findById(id);
        res.json({ result: agente });

    } catch (error) {
        next(error);
    }
});

// PUT /api/agentes/<_id> (body)
// actualiza un agente
router.put('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const agenteActualizado = await AdNopop.findByIdAndUpdate(id, data, { new: true });

        res.json({ result: agenteActualizado });

    } catch (error) {
        next(error);
    };
})

// POST /api/agentes (body)
// Insertar un agente nuevo
router.post('/', async (req, res, next) => {
    try {
        const data = req.body;

        // primero guardamos una instancia de agente en memoria
        const agente = new AdNopop(data);
        // Después lo persistimos (guardamos) en la BD
        const agenteGuardado = await agente.save();
        res.json({ result: agenteGuardado });
    } catch (error) {
        next(error);
    };
})

// DELETE /api/agentes/<_id>
// Elimina un agente
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