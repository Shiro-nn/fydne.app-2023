const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Model = mongoose.model;

const config = require('../config');
const _web = mongoose.createConnection(config.mongoWeb);

module.exports = {};
module.exports.web = {};


module.exports.tradeStats = Model('tradeStats', new Schema({
    date: { type: String },

    high: { type: Number },
    low: { type: Number },

    open: { type: Object, default: {
        average: 0,
        count: 0,
    } },
    close: { type: Object, default: {
        average: 0,
        count: 0,
    } },

    average: { type: Number },
    count: { type: Number },
}));


module.exports.web.sessions = _web.model('sessions', new Schema({
    id: { type: String, default: '' },
    account: { type: Number, default: 0 },
    data: { type: String, default: '' },
    browser: { type: String, default: 'Unknow' },
    loc: { type: String, default: 'Unknow' },
    os: { type: String, default: 'Unknow' },
    expires: { type: Number, default: Date.now() }
}));

module.exports.tps = _web.model('tps', new Schema({
    id: { type: Number },
    name: { type: String },
    tps: { type: Array }
}));

module.exports.statsMoney = _web.model('stats', new Schema({
    money: { type: Number, default: 0 }
}));