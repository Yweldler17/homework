const http = require('http');

http.get(process.argv[2], (res) => {

    res.on('data', (data) => {
        console.log(data.toString());
    })

});