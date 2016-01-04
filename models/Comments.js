/**
 * Created by kmjosephs on 1/4/16.
 */
var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
    body: String,
    author: String,
    upvotes: {type: Number, default: 0},

    // ObjectId refers to a 12 byte MongoDB ObjectId, which is actually what is stored in the database
    // The ref property tells Mongoose what type of object the ID references
    // It alls allows us to retrieve both items simultaneously
    post: {type: mongoose.Schema.Types.ObjectId, ref:'Post'}
});

mongoose.model('Comment', CommentSchema);