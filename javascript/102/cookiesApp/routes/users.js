var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('layout', { title: 'Cookies!', partials: { content: 'users' } });
});

module.exports = router;
