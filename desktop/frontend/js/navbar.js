async function CreateBar() {
    if(document.getElementById('AppNavbarSystem')) return;

    const e1 = document.createElement('div');
    e1.id = 'AppNavbarSystem';
    document.body.appendChild(e1);

    const style = document.createElement('style');
    style.innerHTML = `@import url('../fonts/NeonOL/style.css');`+
`#AppNavbarSystem *{`+
`-webkit-touch-callout: none;`+
`-webkit-user-select: none;`+
`-khtml-user-select: none;`+
`-moz-user-select: none;`+
`-ms-user-select: none;`+
`user-select: none;`+
`}`+
`body{`+
`margin: 0;`+
`}`+
`#AppNavbarSystem{`+
`margin: 0;`+
`font-family: Roboto,sans-serif;`+
//`background-color: #383e4d28;`+
`position: fixed;`+
`left: 0;`+
`right: 0;`+
`top: 0;`+
`height: 27px;`+
`z-index: 999;`+
`-webkit-app-region: drag;`+
`}`+
`#AppNavbarSystem .LogoText{`+
`display: inline-flex;`+
`font-family: NeonOL;`+
`background-color: #ce54f3;`+
`background-image: linear-gradient(155deg, #ff2323, #d445ff);`+
`background-size: 100%;`+
`background-repeat: repeat;`+
`-webkit-text-fill-color: transparent; `+
`-webkit-background-clip: text;`+
`background-clip: text;`+
`margin: 1px 5px;`+
`font-size: 22px;`+
`line-height: 22px;`+
`}`+
`#AppNavbarSystem .ButtonsSelector{`+
`-webkit-app-region: no-drag;`+
`position: absolute;`+
`display: inline-flex;`+
`right: 0;`+
`height: 100%;`+
`}`+
`#AppNavbarSystem .AppButon{`+
`display: inline-flex;`+
`align-content: center;`+
`justify-content: center;`+
`flex-wrap: wrap;`+
`cursor: pointer;`+
`height: 27px;`+
`width: 27px;`+
`}`+
`#AppNavbarSystem .AppButon:hover{`+
`background: #282e38;`+
`}`;
    e1.appendChild(style);

    const e2 = document.createElement('span');
    e2.className = 'LogoText';
    e2.innerHTML = 'fydne';
    e1.appendChild(e2);
    const e3 = document.createElement('span');
    e3.className = 'ButtonsSelector';
    e1.appendChild(e3);
    {
        const e4 = document.createElement('div');
        e4.className = 'AppButon';
        e4.innerHTML = '<svg width="12" height="12" xmlns="http://www.w3.org/2000/svg"><g><line stroke-linecap="undefined" ' +
            'stroke-linejoin="undefined" id="svg_11" y2="5.9375" x2="12" y1="5.875" x1="0" stroke="#8c8c8c" fill="none"/></g></svg>';
        e4.addEventListener('click', () => ipcRenderer.send('navbarEvent', 1));
        e3.appendChild(e4);
    }
    {
        const e4 = document.createElement('div');
        e4.className = 'AppButon';
        e4.innerHTML = '<svg width="12" height="12" xmlns="http://www.w3.org/2000/svg"><g><line stroke="#8c8c8c" stroke-linecap=' +
            '"undefined" stroke-linejoin="undefined" id="svg_7" y2="11.99999" x2="0" y1="0" x1="0" fill="none"/><line stroke="#8c8c8c" ' +
            'stroke-linecap="undefined" stroke-linejoin="undefined" id="svg_8" y2="12" x2="12" y1="0" x1="12" fill="none"/><line stroke=' +
            '"#8c8c8c" stroke-linecap="undefined" stroke-linejoin="undefined" id="svg_9" y2="12" x2="11.9375" y1="12" x1="-0.0625" fill="none"/>' +
            '<line stroke="#8c8c8c" stroke-linecap="undefined" stroke-linejoin="undefined" id="svg_10" y2="0" x2="12" y1="0" x1="0" fill="none"/></g></svg>';
        e4.addEventListener('click', () => ipcRenderer.send('navbarEvent', 2));
        e3.appendChild(e4);
    }
    {
        const e4 = document.createElement('div');
        e4.className = 'AppButon';
        e4.innerHTML = '<svg width="12" height="12" xmlns="http://www.w3.org/2000/svg"><g><line stroke="#8c8c8c" stroke-linecap="undefined"' +
            ' stroke-linejoin="undefined" id="svg_4" y2="12.15625" x2="12.12499" y1="-0.15623" x1="0.00002" fill="none"/><line stroke="#8c8c8c"' +
            ' stroke-linecap="undefined" stroke-linejoin="undefined" id="svg_6" y2="0.03127" x2="12.12499" y1="12.09375" x1="0.00002" fill="none"/></g></svg>';
        e4.addEventListener('click', () => ipcRenderer.send('navbarEvent', 3));
        e3.appendChild(e4);
    }
};

function FindAndAdd() {
    CreateBar();
    setInterval(() => {
        if(document.getElementById('AppNavbarSystem')) return;
        CreateBar();
    }, 1000);
}

FindAndAdd();