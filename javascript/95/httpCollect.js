const http = require('http');

http.get(process.argv[2], (res) => {

    let result = '';
    res.on('data', (data) => {
        result += data.toString();
    });
    res.on('end', () => {
        console.log(result.length);
        console.log(result);
    });

});