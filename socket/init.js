const mongoose = require('mongoose');
const config = require('./config');
const logger = require('./modules/logger');
mongoose.connect(config.mongo, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    logger.log('Подключен к базе-данных');
    require('./socket.init')();
}).catch((err) => console.error(err));

process.on('unhandledRejection', (err) => console.error(err));
process.on('uncaughtException', (err) => console.error(err));