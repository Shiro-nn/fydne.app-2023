const { app, BrowserWindow, globalShortcut, session } = require('electron');
const { Client } = require('qurre-socket');
const Setuper = require('./modules/Setuper');
const NManager = require('./modules/notify');
const startArgs = require('./modules/startArgs');
const startupMenu = require('./modules/startupMenu');
const tpu = require('./modules/TCPPortUsing');
const server = require('./modules/server');
const ipc = require('./modules/ipc');

const dev = false;
const AppPort = dev ? 1337 : 35621;

app.whenReady().then(() => {
    startup();
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) startup();
    })
});
app.on('window-all-closed', function () {
    if (process.platform != 'darwin') app.quit();
});
app.on('web-contents-created', function (ev, contents) {
    try { console.log('window created: ' + contents.getType()); } catch { }
    Setuper.hookNewWindow(contents);
});

async function startup() {
    const _portUse = await PortUsing();
    if (_portUse) return;

    NManager.init(1);
    
    //await require('./modules/ProtocolInjector')();

    const win = Setuper.create();

    win.once('ready-to-show', () => {
        win.show();
    });
    win.on('close', (e) => {
        e.preventDefault();
        win?.hide();
    });

    startupMenu(win);

    server(AppPort, win);
    ipc(win, NManager);

    win.loadFile(__dirname + '/frontend/elements/main.html');
}

async function PortUsing() {
    const _portUse = await tpu(AppPort, '127.0.0.1');
    if (_portUse) {
        try{
            setTimeout(() => app.quit(), 1000);
            const _client = new Client(AppPort);
            _client.emit('OpenApp');
            startArgs.useUrl(startArgs.getUrl(), _client);
        }catch{}
    }
    return _portUse;
}