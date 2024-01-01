const { Schema, model } = require('mongoose');

// Blog Schema
const commentSchema = new Schema({
    Content: {
        type: String,
        required: true
    },
    BlogId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Blog'
    },
    CreatedBy: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, { timestamps: true });

// Blog model
const Comment = model('Comment', commentSchema);

// Blog Export
module.exports = Comment;