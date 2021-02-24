var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('layout', { title: 'Cookies!', partials: { content: 'index' } });
});

router.post('/', function (req, res, next) {
  const cookieUserInfo = req.cookies['userInfo'] ? JSON.parse(req.cookies['userInfo']) : {};
  const userInfo = {
    userName: req.body.userName || cookieUserInfo.userName || "",
    password: req.body.password || cookieUserInfo.password || ""
  }
  console.log(userInfo);
  res.cookie('userInfo', JSON.stringify(userInfo), { maxAge: 60000 });
  res.redirect('/users');

});

// app.use((req, res, next) => {
//   const cookieInfo = req.cookies['info'] ? JSON.parse(req.cookies['info']) : {};
//   const info = {
//     visits: cookieInfo.visits + 1 || 1
//   }
//   res.cookie('info', JSON.stringify(info), { maxAge: 60000 });
//   res.locals.visits = info.visits
//   next();
// });

module.exports = router;
