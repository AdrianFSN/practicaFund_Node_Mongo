'use strict'

const connection = require('./lib/connectMongoose');
const AdNodepop = require('./models/AdNodepop');

main().catch(err => console.log('Ha habido un error', err));

async function main() {
    await initAdsNodepop();
    connection.close();
};

async function initAdsNodepop() {
    const deleted = await AdNodepop.deleteMany();
    console.log(`${deleted.deletedCount} ads have been deleted from the Data Base`);

    const inserted = await AdNodepop.insertMany([
        { name: 'IPhone 13', onSale: true, price: 500, picture: 'aaaa.png', tag: ['mobile', 'work'] },
        { name: 'Samsung Galaxy F4', onSale: true, price: 600, picture: 'bbbb.png', tag: ['mobile', 'work'] },
        { name: 'Motorola Moto G23', onSale: true, price: 130, picture: 'cccc.png', tag: ['mobile', 'work'] },
        { name: 'Realme C51', onSale: false, price: 85, picture: 'dddd.png', tag: ['mobile', 'work'] },
        { name: 'Xiaomi Redmi Note 13', onSale: false, price: 190, picture: 'eeee.png', tag: ['mobile', 'work'] },
        { name: 'Leotec Smartwatch MultiSport', onSale: true, price: 25, picture: 'ffff.png', tag: ['lifestyle'] },
        { name: 'Olsson Fun Patinete Eléctrico', onSale: true, price: 100, picture: 'gggg.png', tag: ['lifestyle'] },
        { name: 'Freidora de Aire', onSale: false, price: 30, picture: 'hhhh.png', tag: ['lifestyle'] },
        { name: 'Cafetera DeLonghi', onSale: false, price: 100, picture: 'iiii.png', tag: ['lifestyle'] },
        { name: 'Sony PlayStation 5 Slim', onSale: true, price: 450, picture: 'jjjj.png', tag: ['lifestyle'] },
        { name: 'VOLKSWAGEN TOURAN SPORT 2.0 TDI', onSale: true, price: 31500, picture: 'kkkk.png', tag: ['motor'] },
        { name: 'CITROEN C3 PURETECH', onSale: true, price: 11000, picture: 'llll.png', tag: ['motor'] },
        { name: 'POLESTAR 2', onSale: true, price: 51000, picture: 'mmmm.png', tag: ['motor'] },
        { name: 'OPEL GRANDLAND X', onSale: false, price: 10000, picture: 'nnnn.png', tag: ['motor'] },
        { name: 'Vespa 125', onSale: true, price: 2000, picture: 'oooo.png', tag: ['motor', 'lifestyle'] },
        { name: 'Mini Tractor', onSale: false, price: 2300, picture: 'pppp.png', tag: ['motor', 'work'] },
        { name: 'Prensa Multicapa', onSale: true, price: 750, picture: 'qqqq.png', tag: ['work'] },
        { name: 'Palets', onSale: false, price: 5, picture: 'rrrr.png', tag: ['work'] },
        { name: 'Carretilla Mano', onSale: false, price: 15, picture: 'ssss.png', tag: ['work'] },
        { name: 'Guantes Jardinería', onSale: true, price: 25, picture: 'tttt.png', tag: ['work'] }
    ]);

    console.log(`${inserted.length} ads have been added to the Data Base.`)
};

