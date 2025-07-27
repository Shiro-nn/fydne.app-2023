const { app, ipcMain } = require('electron');
const { Notify, NotifySound } = require('notify-manager-electron');
const path = require('path');

module.exports = (win, NManager) => {
    ipcMain.on('send.notify', async(_, title, message, time, image, sound, soundVolume) => {
        if(sound) sound = new NotifySound(path.join(__dirname, '../sounds/notify', sound + '.mp3'), soundVolume ?? 50);
        const notify1 = new Notify(title, message, time, image, sound);
        NManager.getManager().show(notify1);
    })
};