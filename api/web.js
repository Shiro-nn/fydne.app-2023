const crypto = require('./modules/cryptoData');
const logger = require('./modules/logger');
const mongo = require('./modules/mongo');
const config = require('./config');

const { Client } = require('qurre-socket');

const fastify = require('fastify')();

fastify.all('/', async (req, reply) => {
    reply.type('application/json').code(200);
    return {error: false, msg: 'welcome to fydne Desktop App API'};
});

fastify.all('/token/validate', async (req, reply) => {
    reply.type('application/json');

    if(!req.query.token) return reply.code(400).send({error: true, message: 'Параметр \'token\' не найден'});

    const exist = await mongo.web.sessions.exists({id: crypto.sha256(crypto.sha256(req.query.token))});
    if(!exist) return reply.code(400).send({error: true, message: 'Сессия не найдена'});

    return reply.code(200).send({error: false});
});
fastify.all('/token/destroy', async (req, reply) => {
    reply.type('application/json');

    if(!req.query.token) return reply.code(400).send({error: true, message: 'Параметр \'token\' не найден'});

    await mongo.web.sessions.deleteOne({id: crypto.sha256(crypto.sha256(req.query.token))});

    return reply.code(200).send({error: false});
});

const cachedTps = {
    date: 0,
    data: null,
}
fastify.all('/tps', async (req, reply) => {
    reply.type('application/json');

    if(Date.now() - cachedTps.date < 10000) return reply.code(200).send(cachedTps.data);

    const tps = await mongo.tps.find();

    const _start = Date.now() - 3600000; // one hour
    for (let i = 0; i < tps.length; i++) {
        const _tps = tps[i];
        _tps._id = null;
        _tps.tps = _tps.tps.filter(x => x.date > _start);
    }

    cachedTps.date = Date.now();
    cachedTps.data = tps;

    return reply.code(200).send(cachedTps.data);
});

const cachedOnline = {
    date: 0,
    data: null,
}
fastify.all('/online', async(req, reply) => {
    reply.type('application/json');

    if(Date.now() - cachedOnline.date < 5000) return reply.code(200).send(cachedOnline.data);
    
    const _client = new Client(2467, config.netSocketIp);

    await new Promise(res => {
        _client.on('socket.online.send', ([data]) => {
            _client.destroy();
    
            cachedOnline.date = Date.now();
            cachedOnline.data = data;
    
            reply.code(200).send(cachedOnline.data);

            res();
        });
        _client.emit('website.online.get');
    });
});

const moneyCount = {
    count: 0,
    updated: Date.now(),
}
fastify.all('/trade/money', async(req, reply) => {
    reply.type('application/json');
    reply.code(200).send(moneyCount);
});

const tradeStatsCache = {
    date: 0,
    data: [],
}
fastify.all('/trade/stats', async(req, reply) => {
    reply.type('application/json');

    if(Date.now() - tradeStatsCache.date < 5000) return reply.code(200).send(tradeStatsCache.data);

    const stats = await mongo.tradeStats.find();
    const tradeStats = [];
    for (let i = 0; i < stats.length; i++) {
        const stat = stats[i];
        tradeStats.push({
            date: stat.date,
            average: stat.average,
            high: stat.high,
            low: stat.low,
            open: stat.open.average,
            close: stat.close.average,
        });
    }
    tradeStatsCache.data = tradeStats;
    tradeStatsCache.date = Date.now();

    return reply.code(200).send(tradeStatsCache.data);
});

fastify.listen({port: 4524, host: 'localhost'}, (err, address) => {
    //new mongo.tradeStats({date: '2023-07-11', average:150, count: 5, high: 300, low: 100, open: {average:520, count:1}, close: {average:530, count:1}}).save()
    if (err) throw err;
    logger.debug('Сайт запущен на '+address);
    try{UpdateMoney();}catch(e){console.log(e)}
});


function UpdateMoney() {
    setInterval(() => update(), 1000 * 60 * 10);
    update();

    async function update() {
        const _data = await mongo.statsMoney.find();
        let total = 0;
        for (let i = 0; i < _data.length; i++) total += _data[i].money;
        moneyCount.count = total;
        moneyCount.updated = Date.now();
    }
}