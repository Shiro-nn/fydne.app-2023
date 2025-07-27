const electron = require('electron');

module.exports = (win) => {
    const menu = [
        {
            label: '&fydne',
            icon: electron.nativeImage.createFromPath(__dirname + '/../icons/appLogo.ico').resize({width:16}),
            enabled: false
        },
        {
            label: '&Закрыть',
            click: () => electron.app.exit(0),
        }
    ];
    const tray = new electron.Tray(__dirname + "/../icons/appLogo.ico")
    tray.setToolTip('fydne');
    tray.setIgnoreDoubleClickEvents(true);
    tray.on('click', () => win.show());
    setTimeout(() => tray.setContextMenu(electron.Menu.buildFromTemplate(menu)), 1000);
};