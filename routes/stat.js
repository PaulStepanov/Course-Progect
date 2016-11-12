/**
 * Created by roman on 08.11.16.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/stat', function(req, res, next) {
    res.render('stat', { title: 'Stat' });
});


module.exports = router;

/**
 * Created by roman on 08.11.16.
 */
