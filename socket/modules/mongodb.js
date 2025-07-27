const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const config = require('../config');
const _web = mongoose.createConnection(config.mongoWeb);

module.exports = {};

module.exports.sessions = _web.model('sessions', new Schema({
    id: { type: String, default: '' },
    account: { type: Number, default: 0 },
    data: { type: String, default: '' },
    browser: { type: String, default: 'Unknow' },
    loc: { type: String, default: 'Unknow' },
    os: { type: String, default: 'Unknow' },
    expires: { type: Number, default: Date.now() }
}));

module.exports.accounts = _web.model('accounts', new Schema({
    email: { type: String, default: '' },
    id: { type: Number, default: 0 },
    user: { type: String, default: '' },
    balance: { type: Number, default: 0 },
    avatar: { type: String },
    banner: { type: String, default: '' },
    name: { type: String, default: '' },
    clan: { type: String, default: '' },
    prefix: { type: String, default: '' },
    achievements: { type: Array, default: [] },
    
    steam: { type: String, default: '' },
    discord: { type: String, default: '' },
}));

module.exports.playerStats = _web.model('stats', new Schema({
    steam: { type: String, default: '' },
    discord: { type: String, default: '' },
    money: { type: Number, default: 0 },
}));