const { app, ipcMain, shell } = require('electron');
const { BrowserWindow } = require('electron-acrylic-window');
const path = require('path');

module.exports = {};

module.exports.hookNewWindow = (webContents) => {
    webContents.setWindowOpenHandler(({ url }) => {
        if (url === 'about:blank') {
            console.log('strange url: ' + url);
            return { action: 'deny' };
        }
        console.log('blocked url: ' + url);
        shell.openExternal(url);
        return { action: 'deny' };
    })
};

module.exports.create = () => {
    let win = new BrowserWindow({
        show: false,
        width: 1280,
        height: 720,
        icon: path.join(__dirname, '../icons/appLogo.png'),
        webPreferences: {
            //devTools: false,
            preload: path.join(__dirname, '../frontend/js/.preload.js'),
        },
        frame: false,
        vibrancy: {
            theme: '#17162dd0',
            effect: 'acrylic',
            maximumRefreshRate: 30,
            disableOnBlur: false,
            useCustomWindowRefreshMethod: false,
        },
        title: 'fydne',
        darkTheme: true,
    });
    
    ipcMain.on('navbarEvent', (ev, code) => {
        if (code == 1) win.minimize();
        else if (code == 2) {
            if (win.isMaximized()) win.unmaximize();
            else win.maximize();
        }
        else if (code == 3) win.hide();
    });
    ipcMain.on('clear.cache', (ev) => {
        if(ev.sender != win.webContents) return;
        win.webContents.session.clearCache();
        console.log('cache cleared');
    });

    return win;
};