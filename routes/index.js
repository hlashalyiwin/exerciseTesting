var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/name', function (req, res, next){
  res.render('name', { title: 'Aye La Yiek'})
})
router.get('/', function(req,res, next){
  res.render('index', {title:'hello Hla Shalyi Win'})
})

module.exports = router;
