/**
 * Created by roman on 08.11.16.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/interview', function(req, res, next) {
    res.render('interview', { title: 'Interview' });
});


module.exports = router;