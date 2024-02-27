'use strict'

const connection = require('./lib/connectMongoose');
const AdNodepop = require('./models/AdNodepop');
const fs = require('fs');

main().catch(err => console.log('Ha habido un error', err));

async function main() {
    await initAdsNodepop();
    connection.close();
};

async function initAdsNodepop() {

    const jsonAdsList = fs.readFileSync('./data/adsList.json', 'utf-8');
    const adsDataInList = JSON.parse(jsonAdsList);

    const deleted = await AdNodepop.deleteMany();
    console.log(`${deleted.deletedCount} ads have been deleted from the Data Base`);

    const inserted = await AdNodepop.insertMany(adsDataInList);

    console.log(`${inserted.length} ads have been added to the Data Base.`)
};

