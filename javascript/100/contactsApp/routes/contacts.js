var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    db.query('SELECT * FROM tblContacts AS c', (error, results, fields) => {
        if (error) {
            return next(error.message);
        }
        res.render('layout', {
            title: 'Contacts',
            contacts: results,
            noContacts: !results.length,
            partials: { content: 'contacts' },
        });
    });
});

router.get('/addContact', function (req, res, next) {
    res.render('layout', {
        title: 'Add Contact',
        partials: { content: 'addContact' }
    });
});

router.post('/addContact', function (req, res, next) {
    db.query('INSERT INTO tblContacts(firstName, lastName, email, phone) VALUES (?, ?, ?, ?)',
        [req.body.firstName, req.body.lastName, req.body.email, req.body.phone],
        (error, results, fields) => {
            if (error) {
                return next(error.message);
            }
            res.redirect('/contacts');
        });
});

router.post('/', function (req, res, next) {
    db.query('DELETE FROM tblContacts WHERE id = ?', [req.body.id],
        (error, results, fields) => {
            if (error) {
                return next(`${req.body.id} - ${error.message}`);
            }
            if (!results.affectedRows) {
                return next(req.body.id);
            }
            res.redirect('/contacts');
        });
});

module.exports = router;