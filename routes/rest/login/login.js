/**
 * Created by Павел on 17-Dec-16.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/login', function(req, res, next) {
    req.session.user={
        login:req.param('login'),
        password:req.param('password')
    };
    req.session.save();
    res.send('signed');
});


module.exports = router;
