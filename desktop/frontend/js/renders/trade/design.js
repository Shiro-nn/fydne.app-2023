try{
(async() => {
    const root = document.querySelector('.moneyCount text');
    const instance = tippy(root, {
        content: 'Количество монеток в обороте',
        followCursor: 'horizontal',
        placement: 'bottom',
        animation: 'scale',
        allowHTML: true
    });

    const res = await fetch(UrlsApi + '/trade/money');
    if(res.status == 200){
        const json = await res.json();
        root.querySelector('count').innerHTML = ParseNum(json.count);
        instance.setContent('Количество монеток в обороте<br>Обновлено ' + GetHourFromDate(json.updated));
    }
})();
}catch(e){console.log(e)}

socket.on('trade.get.money.balance', (steam, discord) => {
    const root = document.querySelector('.userStats .moneyBalance');
    if(steam == '-'){
        root.querySelector('.infoBalance .steam').innerHTML = 'Не найдено';
    }else{
        root.querySelector('.infoBalance .steam').innerHTML = ParseNum(steam) + ' 🪙';
    }
    if(discord == '-'){
        root.querySelector('.infoBalance .discord').innerHTML = 'Не найдено';
    }else{
        root.querySelector('.infoBalance .discord').innerHTML = ParseNum(discord) + ' 🪙';
    }
});
socket.emit('trade.get.money.balance');