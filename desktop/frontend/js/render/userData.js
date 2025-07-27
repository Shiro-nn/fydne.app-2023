socket.on('get.data', (data) => {
    window.localStorage.setItem('user.data', JSON.stringify(data));
    UpdatePanelData();
});
socket.emit('get.data');

UpdatePanelData();
function UpdatePanelData() {
    const str = window.localStorage.getItem('user.data');
    if(!str) return;
    const _data = JSON.parse(str);
    const _root = document.querySelector('.panel');
    if(!_root) return;

    const avatar = _root.querySelector('.avatar');
    if(avatar) avatar.style.backgroundImage = `url('${_data.avatar}')`;
}