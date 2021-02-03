const fs = require('fs');

module.exports = (dirName, extStr, callback) => {
    fs.readdir(dirName, (err, data) => {
        if (err) {
            return callback(err)
        }
        list = data.filter(str => str.endsWith("." + extStr))
        callback(null, list)
    });
};