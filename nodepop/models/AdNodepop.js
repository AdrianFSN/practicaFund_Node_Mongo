// Aquí va el modelo de construcción de cada anuncio
// Esquema de Mongoose

const mongoose = require('mongoose');


const adSchema = mongoose.Schema({
    name: {
        type: String, required: true, index: true
    },
    onSale: { type: Boolean, required: true, index: true },
    price: { type: Number, required: true, index: true },
    picture: String,
    tag: {
        type: [String],
        validate: {
            validator: (tags) => {
                return tags.length > 0;
            },
            message: 'All ads must have at least one tag'
        },
        index: true
    }
});

// método listCriterias (estático), porque está en el modelo
adSchema.statics.listCriterias = function (filter, skip, limit, sort, fields) {
    const query = AdNodepop.find(filter);
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