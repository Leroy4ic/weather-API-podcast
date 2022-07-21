function convertTime(unixTime, timezone) {
    let timezoneOffset = new Date().getTimezoneOffset() * 60;
    let date = new Date((unixTime + timezoneOffset + timezone) * 1000);
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    let time = hours + ":" + minutes.slice(-2);
    return time;
}


function getForecastDate(index) {
    let newDate = new Date();
    newDate.setDate(newDate.getDate() + index);
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    if (month < 10) {
        month = '0' + month;
    }
    if (date < 10) {
        date = '0' + date;
    }

    return date + '.' + month
}