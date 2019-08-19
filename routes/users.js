var express = require('express');
var router = express.Router();
var User = require('../model/User');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/useradd', function(req,res, next){//
  res.render('user/useradd', {title: 'User Add'});// ejs file
});
router.post('/useradd', function(req, res, next) {
  var user = new User();
  user.name = req.body.name;
  user.email = req.body.email;
  user.password = req.body.pass;
  //console.log('aye', req.body.pass);
  user.save(function (err,rtn) {
    if(err) throw err;
    console.log('return',rtn);
    res.redirect('/users/userdetail/'+ rtn.id);
  })
});
router.get('/userdetail/:id',function (req,res, next){
  User.findById(req.params.id, function (err,rtn){
    if(err) throw err;
    console.log(rtn);
    res.render('user/userdetail',{ title:'User Detail', user:rtn});
  })
})
router.get('/list', function (req,res, next){
  User.find({},function(err,rtn){
    if(err) throw err;
    console.log(rtn);
    res.render('user/userlist',{title:'User List', user:rtn});
  })
})

//Update
router.get('/userUpdate/:id', function (req,res, next) {
  User.findById(req.params.id,function (err,rtn){
    if(err) throw err;
    console.log(rtn);
    res.render('user/userupdate',{title:'User Update',user:rtn})
  })
})
router.post('/update', function(req,res, next){
  var update = {
    name : req.body.name,
    email : req.body.email,
    password : req.body.pass
  }
  User.findByIdAndUpdate(req.body.id,{$set : update},function(err,rtn){
    if(err) throw err;
    console.log(rtn);
    res.redirect('/users/list');
  })
})
//Delete
router.get('/userDelete/:id',function(req,res, next){
  User.findByIdAndRemove(req.params.id,function(err,rtn){
    if(err) throw err;
    console.log(rtn);
    res.redirect('/users/list');
  })
})
module.exports = router;
