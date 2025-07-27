(async () => {
    const dps1 = [], dps2 = [];
    const stockChart = new CanvasJS.StockChart('graphMoney', {
        theme: 'dark1',
        exportEnabled: false,
        charts: [{
            axisX: {
                crosshair: {
                    enabled: true,
                    snapToDataPoint: true
                }
            },
            axisY: {
                prefix: '🪙'
            },
            data: [{
                type: 'candlestick',
                yValueFormatString: '🪙#,###.##',
                risingColor: '#3ad437',
                fallingColor: '#ff4040',
                dataPoints: dps1
            }]
        }],
        navigator: {
            data: [{
                dataPoints: dps2
            }],
            slider: {
                minimum: Date.now() - 2592000000, // 1 mounth
                maximum: Date.now()
            }
        }
    });

    const res = await fetch(UrlsApi + '/trade/stats');
    const data = await res.json();

    for (var i = 0; i < data.length; i++) {
        dps1.push({
            x: new Date(data[i].date),
            y: [Number(data[i].open), Number(data[i].high), Number(data[i].low), Number(data[i].close)],
            color: data[i].open < data[i].close ? '#3ad437' : '#ff4040'
        });
        dps2.push({ x: new Date(data[i].date), y: Number(data[i].average) });
    }

    stockChart.render();
    setTimeout(() => {try{document.querySelector('#graphMoney .canvasjs-chart-toolbar').outerHTML = '';}catch{}}, 100);
})();