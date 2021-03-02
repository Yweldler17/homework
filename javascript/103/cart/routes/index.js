var express = require('express');
const Cart = require('../cart');
var router = express.Router();

router.use((req, res, next) => {
  const cart = new Cart(req.session.cart ? req.session.cart.items : {});
  req.cart = cart;
  next();
});

/* GET home page. */
router.route('/')
  .get((req, res, next) => {
    res.render('layout', { title: 'Express', partials: { content: 'index' }, items: global.items });
  })
  .post((req, res, next) => {
    const cart = new Cart(req.session.cart ? req.session.cart.items : {});
    console.log('before add', cart);
    cart.addItem(req.body.id, +req.body.count);
    console.log('after add', cart);
    req.session.cart = cart;
    res.redirect('/');
  });


router.get('/cart', (req, res, next) => {
  const items = req.cart.getItems();
  res.render('layout', {
    title: 'Express',
    partials: { content: 'cart' },
    items: items,
    noItems: !items.length,
    total: items.reduce((a, c) => a + (+c.subtotal), 0).toFixed(2)
  });
});


module.exports = router;
