/**
 * Created by Павел on 17-Dec-16.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/login', function(req, res, next) {
    console.log(req.session);
    if (req.session.valuee==undefined) {
        req.session.valuee=0;
    };
    req.session.valuee++;
    console.log(req.session.valuee);
    res.send('signed');
    req.session.save();
});


module.exports = router;
