var express = require('express');
var router = express.Router();

const contacts = [
    {
        first: 'srwerwef',
        last: 'sdfrsdf',
        phone: '2352564657',
        email: 'j4646rrred@wdyytytuse.com'
    },
    {
        first: 'sgthyityt',
        last: 'er44thhbg',
        phone: '32546576878',
        email: 'dfhhgfh@dfhdfhgjk.com'
    }
];

router.get('/', function (req, res, next) {
    res.render('layout', {
        title: 'Contacts',
        contacts,
        noContacts: !contacts.length,
        partials: { content: 'contacts' },
    });
});

router.get('/addContact', function (req, res, next) {
    res.render('layout', {
        title: 'Add Contact',
        partials: { content: 'addContact' }
    });
});

router.post('/addContact', function (req, res, next) {
    contacts.push(req.body);
    res.redirect('/contacts');
});

module.exports = router;