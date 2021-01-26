let result = 0;
for (let i = 2; i < process.argv.length; i++) {
    result += parseInt(process.argv[i]);
}
console.log(result);