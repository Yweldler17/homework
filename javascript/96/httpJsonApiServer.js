const http = require('http');
const url = require('url');

http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    const myUrl = url.parse(req.url, true)
    const time = new Date(myUrl.query.iso)
    parsedTime = {
        hour: time.getHours(),
        minute: time.getMinutes(),
        second: time.getSeconds()
    };
    res.end(JSON.stringify(parsedTime))
}).listen(process.argv[2])