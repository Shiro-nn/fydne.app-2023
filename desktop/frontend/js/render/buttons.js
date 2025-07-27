window.addEventListener('load', () => {
    const _root = document.querySelector('.panel');
    if(!_root) return;

    SetupButtons(_root);

    tippy(_root.querySelector('.avatar'), {content: '?', followCursor: 'vertical', placement: 'right', animation: 'scale', onShow(instance) {
        const str = window.localStorage.getItem('user.data');
        if(!str) return;
        const _data = JSON.parse(str);
        instance.setContent(_data.username);
    }});
    tippy(_root.querySelector('.home'), {content: 'Домой', followCursor: 'vertical', placement: 'right', animation: 'scale'});
    tippy(_root.querySelector('.trade'), {content: 'Трейд', followCursor: 'vertical', placement: 'right', animation: 'scale'});
    tippy(_root.querySelector('.clans'), {content: 'Кланы', followCursor: 'vertical', placement: 'right', animation: 'scale'});
    tippy(_root.querySelector('.cw'), {content: 'Клановые Войны', followCursor: 'vertical', placement: 'right', animation: 'scale'});

    tippy(_root.querySelector('.downloads'), {content: 'Библиотека', followCursor: 'vertical', placement: 'right', animation: 'scale'});
    tippy(_root.querySelector('.chats'), {content: 'Чаты', followCursor: 'vertical', placement: 'right', animation: 'scale'});

    tippy(_root.querySelector('.notifies'), {content: 'Уведомления', followCursor: 'vertical', placement: 'right', animation: 'scale'});
    tippy(_root.querySelector('.settings'), {content: 'Настройки', followCursor: 'vertical', placement: 'right', animation: 'scale'});
    tippy(_root.querySelector('.logout'), {content: 'Выйти', followCursor: 'vertical', placement: 'right', animation: 'scale'});
});

function RemoveActiveButtons(root) {
    for(let i in root.children){
        const kid = root.children[i];
        try{kid.className = kid.className.replace('active', '').trim();}catch{}
    }
}
function SetActiveButton(element) {
    element.className += ' active';
}
function SetFramePage(name){
    document.querySelector('iframe').src = '../renders/' + name + '.html';
}

function SetupButtons(root) {
    try{SetupButtonHome(root)}catch{}
    try{SetupButtonTrade(root)}catch{}
    try{SetupButtonClans(root)}catch{}
    try{SetupButtonClansWars(root)}catch{}

    try{SetupButtonDownloads(root)}catch{}
    try{SetupButtonChats(root)}catch{}

    try{SetupButtonSettings(root)}catch{}
    try{SetupButtonLogout(root)}catch{}
};

function SetupButtonHome(root) {
    SetupAverageButtonByName(root, 'home');
};

function SetupButtonTrade(root) {
    SetupAverageButtonByName(root, 'trade');
};

function SetupButtonClans(root) {
    SetupAverageButtonByName(root, 'clans');
};

function SetupButtonClansWars(root) {
    SetupAverageButtonByName(root, 'cw');
};

function SetupButtonDownloads(root) {
    SetupAverageButtonByName(root, 'downloads');
};

function SetupButtonChats(root) {
    SetupAverageButtonByName(root, 'chats');
};

function SetupButtonSettings(root) {
    SetupAverageButtonByName(root, 'settings');
};

function SetupButtonLogout(root) {
    let inProcess = false;
    root.querySelector('.logout').addEventListener('click', async() => {
        if(inProcess) return;
        inProcess = true;
        await fetch(UrlsApi + '/token/destroy?token=' + window.localStorage.getItem('private.token'));
        window.localStorage.setItem('private.token', null);
        inProcess = false;
        window.location.href = BaseHref + 'prepare/auth.html';
    });
};



function SetupAverageButtonByName(root, name) {
    const _element = root.querySelector('.'+name);
    _element.addEventListener('click', async() => {
        try{RemoveActiveButtons(root);}catch{}
        try{SetActiveButton(_element);}catch{}
        try{SetFramePage(name);}catch{}
    });
}