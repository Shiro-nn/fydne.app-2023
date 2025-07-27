(async() => {
const parent = document.querySelector('.top .servers');

const res = await fetch(UrlsApi + '/online');
let json = await res.json();

if(json.length == 0) return;
parent.innerHTML = '<h1>Онлайн на серверах</h1>';

json = json.sort(function (a, b) {return ('' + a.name).localeCompare(b.name)});

for (let i = 0; i < json.length; i++) {
    const server = json[i];
    const serverEl = RenderServer(server);
    parent.appendChild(serverEl);
}
json = null;

setInterval(async() => {
    const res = await fetch(UrlsApi + '/online');
    let json = await res.json();
    
    if(json.length == 0) return;
    
    json = json.sort(function (a, b) {return ('' + a.name).localeCompare(b.name)});

    let kids = [];
    for (let i = 0; i < parent.children; i++) {
        kids.push(parent.children[i]);
    }

    for (let i = 0; i < json.length; i++) {
        const server = json[i];
        const _el = parent.querySelector(`div[id="${server.ip}:${server.port}"]`);
        if(!_el){
            const serverEl = RenderServer(server);
            if(kids.length > 0) parent.insertBefore(serverEl, kids[0]);
            else parent.appendChild(serverEl);
        }else{
            const index = kids.indexOf(_el);
            if(index > -1) kids.splice(index, 1);
            NewOnline(_el, server.online);
        }
    }

    for (let i = 0; i < kids.length; i++) {
        NewOnline(kids[i], 0);
    }
    kids = null;
}, 5000);

async function NewOnline(el, stats){
    const span = el.querySelector('.server-online span');
    const act = el.querySelector('.server-online act');
    const onlineArr = span.innerHTML.split('/');

    const cur = parseInt(onlineArr[0]);
    const max = parseInt(onlineArr[1]);
    
    if(stats == cur) return;
    if(stats > cur){
        for (let i = cur + 1; i < stats; i++) {
            await Update(i);
        }
    }else{
        for (let i = cur - 1; i > stats; i--) {
            await Update(i);
        }
    }
    Update(stats);

    async function Update(i) {
        span.innerHTML = i + '/' + onlineArr[1];
        act.style.width = ((i / max * 100)|0) + '%';
        await new Promise(res => setTimeout(() => res(), 50));
    }
}

function RenderServer(server) {
    const serverEl = document.createElement('div');
    serverEl.className = 'server';
    serverEl.id = server.ip + ':' + server.port;
    
    const name = document.createElement('p');
    name.className = 'server-name';
    name.innerHTML = server.name;
    serverEl.appendChild(name);
    
    const online = document.createElement('p');
    online.className = 'server-online';
    serverEl.appendChild(online);
    
    const onlineCount = document.createElement('span');
    onlineCount.innerHTML = server.online + '/' + server.max;
    online.appendChild(onlineCount);
    
    const onlineHr = document.createElement('act');
    onlineHr.style.width = ((server.online / server.max * 100)|0) + '%';
    onlineHr.innerHTML = '⠀';
    online.appendChild(onlineHr);

    return serverEl;
}
})();