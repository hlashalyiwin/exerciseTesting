var express = require('express');
var router = express.Router();
var Post = require('../model/Post');
//
router.get('/postadd', function(req,res, next){
  res.render('post/userpostadd', {title: 'User Post Add'});
});

//database save
router.post('/postadd', function(req, res, next) {
  var post = new Post();
  post.title = req.body.title;
  post.content = req.body.content;
  post.author = req.body.author;
  post.save(function (err,rtn) {
    if(err) throw err;
    console.log('return',rtn);
    res.redirect('/posts/userpostdetail/'+ rtn.id);
  })
});

router.get('/userpostdetail/:id',function (req,res, next){
  Post.findById(req.params.id, function (err,rtn){
    if(err) throw err;
    console.log(rtn);
    res.render('post/userpostdetail',{title:'User Post Detail', post:rtn});
  })
})

router.get('/userpostlist', function (req,res, next){
  Post.find({},function(err,rtn){
    if(err) throw err;
    res.render('post/userpostlist',{title:'User Post List', post:rtn});
  })
})

//Update
router.get('/userpostUpdate/:id', function (req,res, next) {
  Post.findById(req.params.id,function (err,rtn){
    if(err) throw err;
    console.log(rtn);
    res.render('post/userpostupdate',{title:'User Post Update',post:rtn})
  })
})

router.post('/postupdate', function(req,res, next){
  var postupdate = {
    title : req.body.title,
    content : req.body.content,
    author : req.body.author
  }
  Post.findByIdAndUpdate(req.body.id,{$set : postupdate},function(err,rtn){
    if(err) throw err;
    console.log(rtn);
    res.redirect('/posts/userpostlist');
  })
})

//Delete
router.get('/userpostdelete/:id',function(req,res, next){
  Post.findByIdAndRemove(req.params.id,function(err,rtn){
    if(err) throw err;
    console.log(rtn);
    res.redirect('/posts/userpostlist');
  })
})

module.exports = router;
