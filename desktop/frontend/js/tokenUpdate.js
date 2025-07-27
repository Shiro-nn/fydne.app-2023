ipcRenderer.on('update.token', async(_, token) => {
    const iframe = document.querySelector('iframe');
    iframe.src = BaseHref + 'loading.html';

    let allowChange = true;
    try{iframe.contentWindow.document.body.querySelector('h1').innerHTML = 'Идет проверка токена...';}
    catch{setTimeout(() => {if(allowChange)iframe.contentWindow.document.body.querySelector('h1').innerHTML = 'Идет проверка токена...';}, 200);}

    const res = await fetch(UrlsApi + '/token/validate?token='+token);
    const json = await res.json();

    allowChange = false;
    if(json.error){//title, message, time, image, sound
        const _sound = WindowNotifySound.get();
        ipcRenderer.send('send.notify', 'Ошибка авторизации', 'При попытке обработать новый токен произошла ошибка:<br>' + json.message, 30, null, _sound.name, _sound.volume);
        iframe.src = BaseHref + 'main.html';
        return;
    }

    window.localStorage.setItem('private.token', token);
    iframe.src = BaseHref + 'main.html';
    UpdateSocket();
});