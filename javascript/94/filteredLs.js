const fs = require('fs');
fs.readdir(process.argv[2], function finishedReading(err, list) {
    if (err) {
        return console.log(err);
    }
    list.filter(str => str.endsWith("." + process.argv[3]))
        .forEach(file => {
            console.log(file);
        })
});

