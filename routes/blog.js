const { Router } = require('express');
const Blog = require('../models/blog');
const Comment = require('../models/comment');
const multer = require('multer');
const path = require('path');

// Define
const router = Router();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(`./public/uploads/`));
    },
    filename: function (req, file, cb) {
        const filename = `${Date.now()}-${file.originalname}`;
        cb(null, filename);
    }
});

const upload = multer({ storage: storage });

// Routes
router.get('/add', (req, res) => {
    return res.render('blog', {
        user: req.user
    });
});

router.post('/add', upload.single('CoverImage'), async (req, res) => {
    const { Title, Body } = req.body;
    await Blog.create({
        Title,
        Body,
        CreatedBy: req.user._id,
        CoverImageURL: `/uploads/${req.file.filename}`
    });
    return res.redirect('/');
});

router.get('/:id', async (req, res) => {
    const blog = await Blog.findById(req.params.id).populate('CreatedBy');
    const comments = await Comment.find({BlogId: req.params.id}).populate('CreatedBy');
    return res.render('bloginfo', {
        user: req.user,
        blog: blog,
        comments: comments
    })
});

router.post('/comment/:BlogId', async (req, res) => {
    await Comment.create({
        Content: req.body.Content,
        BlogId: req.params.BlogId,
        CreatedBy: req.user._id
    });
    res.redirect(`/blog/${req.params.BlogId}`)
});

// Export
module.exports = router;