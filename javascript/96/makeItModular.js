const myModule = require('./myModule');

myModule(process.argv[2], process.argv[3], (err, list) => {
    if (err) {
        console.error(err);
    }
    list.forEach(file => console.log(file));
});