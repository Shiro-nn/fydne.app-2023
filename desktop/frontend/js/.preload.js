const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('ipcRenderer', { ...ipcRenderer,
    on: (name, event) => ipcRenderer.on(name, event),
    once: (name, event) => ipcRenderer.once(name, event),
    send: (name, ...args) => ipcRenderer.send(name, ...args),
});

window.addEventListener('DOMContentLoaded', async() => {
    for (const type of ['chrome', 'node', 'electron']) {
        console.log(`${type}-version`, process.versions[type]);
    }
    
    setInterval(async() => {
        const ram = await process.getProcessMemoryInfo();
        if(ram.residentSet > 2400000){ // 300MB
            ipcRenderer.send('clear.cache');
        }
    }, 5000);
});