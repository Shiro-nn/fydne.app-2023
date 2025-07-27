const mongo = require('../mongodb').sessions;
const crypto = require('../cryptoData');

module.exports = function() {
    let cache = [];
    return {
        get: async(id, latest = false) => {
            if(!latest && cache.some(x => x.uid == id && Date.now() - x.lastSyns < 100000 && x.expires - Date.now() > 0)){
                const _exist = await mongo.exists({id:crypto.sha256(crypto.sha256(id))});
                if(!_exist) return {};
                return cache.find(x => x.uid == id).data;
            }
            const _data = await mongo.findOne({id:crypto.sha256(crypto.sha256(id))});
            if(_data == null || _data == undefined) return {};
            cache = cache.filter(x => x.uid != id);
            cache.push({uid:id, data:JSON.parse(_data.data), lastSyns: Date.now(), expires: _data.expires});
            _data.last = Date.now();
            await _data.save();
            return JSON.parse(_data.data);
        }
    }
}