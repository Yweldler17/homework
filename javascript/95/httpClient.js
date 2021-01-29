const http = require('http');

http.get('http://jsonplaceholder.typicode.com/todos/1', (res) => {

    res.on('data', (data) => {
        console.log(data.toString());
    })

});