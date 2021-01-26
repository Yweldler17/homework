const fs = require('fs');
fs.readdir(process.argv[2], function finishedReading(err, list) {
    if (err) {
        return console.log(err);
    }
    let result = list.filter(str => str.endsWith(process.argv[3]));
    result.forEach(file => {
        if (file.length > process.argv[3].length) {
            console.log(file);
        }
    })
});

