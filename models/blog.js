const { Schema, model } = require('mongoose');

// Blog Schema
const blogSchema = new Schema({
    Title: {
        type: String,
        required: true
    },
    Body: {
        type: String,
        required: true
    },
    CoverImageURL: {
        type: String
    },
    CreatedBy: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, { timestamps: true });

// Blog model
const Blog = model('Blog', blogSchema);

// Blog Export
module.exports = Blog;