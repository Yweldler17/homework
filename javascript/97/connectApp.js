const app = require('connect')();



app.use('/home', (req, res, next) => {
    res.end('This is the home page');
});

app.use(require('./queryParser'));

app.use('/about', (req, res, next) => {
    res.end('This is the about page');
});

app.listen(80);