const { Server } = require('socket.io');
const mongo = require('./modules/mongodb');
const crypt = require('./modules/cryptoData');

module.exports = async(server, session) => {
    const io = new Server(server, {
        path: '/socket/',
        cors: {
            origin: "*"
        },
    });
    io.use(async(socket, next) => {
        try{
            socket.session = socket.handshake.auth.token;
            next();
        }catch{next()}
    });
    io.on('connection', async(socket) => {
        const token = socket.session;
        let _session = {};

        const GetUID = async(latest = false) => {
            if(!token) return 0;
            const _res = await session.get(token, latest);
            _session = _res;
            return _res.id;
        }
        const GetInfo = async(latest = false) => {
            const _res = await session.get(token, latest);
            _session = _res;
            return _res;
        }

        socket.on('first.logged', async() => {
            const __uid = await GetUID();
            if(!isNaN(__uid) && __uid > 0){
                return socket.emit('first.logged', true);
            }
            socket.emit('first.logged', false);
        });

        socket.on('get.data', async() => {
            const __uid = await GetUID();
            const _data = await mongo.accounts.findOne({id:__uid});
            if(!_data) return;
            socket.emit('get.data', {
                username: _data.name == '' ? _data.user : _data.name,
                avatar: _data.avatar,
                id: _data.id,
            });
        });


        socket.on('trade.get.money.balance', async() => {
            const __uid = await GetUID();
            const _data = await mongo.accounts.findOne({id:__uid});
            const _steamData = _data.steam != '' ? await mongo.playerStats.findOne({steam: _data.steam}) : null;
            const _discordData = _data.discord != '' ? await mongo.playerStats.findOne({discord: _data.discord}) : null;
            socket.emit('trade.get.money.balance', (_steamData ? _steamData.money : '-'), (_discordData ? _discordData.money : '-'));
        });

        

        socket.on('disconnect', () => clearInterval(checkSession));
        const checkSession = setInterval(async() => {
            const __uid = await GetUID();
            if(isNaN(__uid) || 0 >= __uid){
                socket.emit('first.logged', false);
            }
        }, 5000);
    });
};