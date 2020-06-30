

const ParseDateString = () => {
    var today = new Date();
    var date =
        today.getFullYear() +
        ':' +
        (today.getMonth() + 1) +
        ':' +
        today.getDate() +
        ':' +
        today.getHours() +
        ':' +
        today.getMinutes() +
        ':' +
        today.getSeconds();

    return date;
}


export default ParseDateString;