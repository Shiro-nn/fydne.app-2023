const UrlsSocket = 'https://desktop.scpsl.shop'; // https://desktop.scpsl.shop / http://localhost:4964
const UrlsApi = 'https://desktop.scpsl.shop'; // https://desktop.scpsl.shop / http://localhost:4524
const BaseHref = (() => {
    const _href = window.location.href.replace('file:///', '');
    const _arr = _href.split('/');
    let _url = 'file:///';
    for (let i = 0; i < _arr.length; i++) {
        const _str = _arr[i];
        _url += _str + '/';
        if(_str == 'elements') i = _arr.length;
    }
    _url += 'views/';
    return _url;
})();