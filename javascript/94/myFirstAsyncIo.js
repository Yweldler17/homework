const fs = require('fs');
fs.readFile(process.argv[2], function finishedReading(err, data) {
    if (err) {
        return console.log(err);
    }
    let lines = data.toString().split('\n').length - 1;
    console.log(lines);
});
