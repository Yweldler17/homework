const fs = require('fs');
let lines = fs.readFileSync(process.argv[2]).toString().split('\n');
console.log(lines.length - 1);