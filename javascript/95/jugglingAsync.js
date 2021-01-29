const http = require('http');

let returnList = [];

for (let i = 2; i < process.argv.length; i++) {
    http.get(process.argv[i], (res) => {
        let result = '';
        res.on('data', (data) => {
            result += data.toString();
        });
        res.on('end', () => {
            returnList[i - 2] = result;
            if (returnList.length > 2) {
                printResults();
            }
        });
    });
}

function printResults() {
    for (let i = 0; i < returnList.length; i++) {
        console.log(returnList[i]);
    }
}

