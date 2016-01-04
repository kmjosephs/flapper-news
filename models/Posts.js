/**
 * Created by kmjosephs on 1/3/16.
 */
var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
    title: String,
    link: String,
    upvotes: {type: Number, default:0},
    // allows us to use Mongoose's [populate()] mongoose populate method to easily get comments for a given post
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
});

mongoose.model('Post', PostSchema);