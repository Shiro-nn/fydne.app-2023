(async() => {
const tpsElement = document.getElementById('tps.area');
const config = {
    type: 'line',
    data: {},
    options: {
        responsive: true,
        plugins: {
            tooltip: {
                mode: 'index',
                intersect: false
            },
        },
        hover: {
            mode: 'index',
            intersec: false
        },
        scales: {
            y: {
                min: 0,
                ticks: {
                    stepSize: 50
                }
            }
        }
    },
};

const chart = new Chart(tpsElement, config);

{
await new Promise(res => setTimeout(() => res(), 500));
const res = await fetch(UrlsApi + '/tps');
const tps = await res.json();

const _now = Date.now();
const _start = _now - (1000 * 60 * 60); // one hour
const labels = [];
const datasets = [];
for (let i = 0; i < tps.length; i++) {
    const _tps = tps[i];
    _tps.tps = _tps.tps.filter(x => x.date > _start);
    datasets.push({
        label: _tps.name,
        _server: _tps.id,
        borderColor: GetColor(i),
        data: [],
    });
    for (let z = 0; z < _tps.tps.length; z++) {
        const ticks = _tps.tps[z];
        ticks.date = Math.round(ticks.date / 10000); // 10 seconds
    }
}
for (let i = Math.round(_start / 10000); i < Math.round(_now / 10000); i++) {
    labels.push(ParseDateToString(i));
    for (let z = 0; z < datasets.length; z++) {
        const dataset = datasets[z];
        let _ticks = 70;
        try{
            const _serverData = tps.find(x => x.id == dataset._server);
            if(_serverData){
                const ticksFromServer = _serverData.tps.find(x => x.date == i);
                if(!isNaN(ticksFromServer.tps)){
                    _ticks = ticksFromServer.tps;
                }
            }
        }catch{}
        dataset.data.push(_ticks);
    }
}

chart.config.data = {labels, datasets};
chart.update();

function ParseDateToString(num) {
    const date = new Date(num * 10000);
    return `${dateTimePad(date.getHours(), 2)}:${dateTimePad(date.getMinutes(), 2)}:${dateTimePad(date.getSeconds(), 2)}`;
}
function dateTimePad(value, digits){
    let number = value;
    while (number.toString().length < digits) {
        number = '0' + number;
    }
    return number;
}

function GetColor(i) {
    switch (i) {
        case 0: return '#d445ff'
        case 1: return '#ff2323';
        case 2: return '#0047ff';
        case 3: return '#5486f3';
        default: return '#ff0';
    }
}
}
})();