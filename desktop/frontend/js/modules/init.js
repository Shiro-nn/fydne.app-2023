const ipcRenderer = window.top.ipcRenderer;
const socket = window.top.socket;

window.socket = socket;
window.ipcRenderer = ipcRenderer;