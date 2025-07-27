let socket;

const UpdateSocket = () => {
    socket = io(UrlsSocket, {
        path: '/socket/',
        auth: {
            token: window.localStorage.getItem('private.token')
        },
        transports: ['websocket', 'polling']
    });
    window.socket = socket;
};

UpdateSocket();