function GetHourFromDate(date) {
    const time = new Date(parseInt(date));
    return dateTimePad(time.getHours(), 2) + ':' + dateTimePad(time.getMinutes(), 2) + ':' + dateTimePad(time.getSeconds(), 2);
}


function removeItemOnce(arr, value) {
    var index = arr.indexOf(value);
    if(index > -1) arr.splice(index, 1);
    return arr;
}

function removeItemAll(arr, value) {
    var i = 0;
    while(i < arr.length){
        if(arr[i] === value) arr.splice(i, 1);
        else ++i;
    }
    return arr;
}


function dateTimePad(value, digits){
    let number = value
    while (number.toString().length < digits) {
        number = "0" + number
    }
    return number;
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


function ParseNum(value) {
    value = `${value}`;
    let parse = '';
    while(value.length > 0){
        parse = value.substring(Math.max(value.length - 3, 0), value.length) + ' ' + parse;
        value = value.slice(0, -3);
    }
    return parse;
}