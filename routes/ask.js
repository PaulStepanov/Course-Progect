/**
 * Created by roman on 08.11.16.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/ask', function(req, res, next) {
    res.render('ask', { title: 'Asks' });
});


module.exports = router;

