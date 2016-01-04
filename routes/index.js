var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');

router.get('/posts', function(req, res, next){

  // queries the database for all posts
  Post.find(function(err, posts){
    if (err){
      next(err);
    }
    res.json(posts);
  })
});

//route for posting data to the server
router.post('/posts', function(req, res, next){
  var post = new Post(req.body);
  post.save(function(err,post){
    if (err){ return next(err);}
    res.json(post);
  })
});
module.exports = router;
