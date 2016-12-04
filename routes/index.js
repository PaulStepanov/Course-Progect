var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
// router.get('/ask', function(req, res, next) {
//   res.render('ask', { title: 'Asks' });
// });
//
// router.get('/stat', function(req, res, next) {
//   res.render('stat', { title: 'Stat' });
// });
//
// router.get('/interview', function(req, res, next) {
//   res.render('interview', { title: 'Interview' });
// });

module.exports = router;

