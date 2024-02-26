// Aquí va el modelo de construcción de cada anuncio
// Esquema de Mongoose

const mongoose = require('mongoose');


const adSchema = mongoose.Schema({
    //{tag: 'mobile', name: 'Samsung Galaxy Flip 4', onSale: true, price: 500, picture: '\ññññ' }
    tag: String,
    name: String,
    onSale: Boolean,
    price: Number,
    picture: String
});

// método listar (estático), porque está en el modelo
adSchema.statics.listar = function (filtro, skip, limit, sort, fields) {
    const query = AdNodepop.find(filtro);
    query.skip(skip);
    query.limit(limit);
    query.sort(sort);
    query.select(fields);
    return query.exec(); // esto devolvería la promesa que voy a await en ads.js
}


// crear el modelo de anuncio

const AdNodepop = mongoose.model('adsNodepop', adSchema);

// Opcional, exportar el modelo
module.exports = AdNodepop;