socket.on('first.logged', (logged) => {
    if(!logged){
        window.location.href = BaseHref + 'prepare/auth.html';
        return;
    }
    window.location.href = BaseHref + 'render.html';
});

let __connected = socket.connected;
socket.on('connect', () => __connected = true);
setInterval(() => {
    if(!__connected) return;
    if(socket.connected) return;
    __connected = false;
    window.location.href = BaseHref + 'main.html';
}, 1000);