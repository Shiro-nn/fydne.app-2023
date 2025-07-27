const mongoose = require('mongoose');
const logger = require('./modules/logger');
const config = require('./config');

mongoose.connect(config.mongo, { useNewUrlParser: true, useUnifiedTopology: true }).then(async() => {
    logger.log('Подключен к базе-данных');
    require('./web');
    //require('./modules/runScripts')();
}).catch((err) => console.error(err));

process.on('unhandledRejection', (err) => console.error(err));
process.on('uncaughtException', (err) => console.error(err));