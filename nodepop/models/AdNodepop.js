// Aquí va el modelo de construcción de cada anuncio
// Esquema de Mongoose

const mongoose = require('mongoose');


const adSchema = mongoose.Schema({
    name: { type: String, required: true },
    onSale: { type: Boolean, required: true },
    price: { type: Number, required: true },
    picture: String,
    tag: {
        type: [String],
        validate: {
            validator: function (tags) {
                return tags.length > 0;
            },
            message: 'All ads must have at least one tag'
        }
    }
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