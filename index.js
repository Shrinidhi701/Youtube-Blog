const express = require('express');
const path = require('path');
const userRoutes = require('./routes/user');
const blogRoutes = require('./routes/blog');
const { connectToMongoDB }= require('./connection');
const cookieParser = require('cookie-parser');
const { checkForAthenticationCookie } = require('./middleware/auth');
const Blog = require('./models/blog');

// Define
const app = express();
const PORT = 2975;
connectToMongoDB();

// SET
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

// USE
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAthenticationCookie('Token'));
app.use(express.static(path.resolve('./public')))

// Routes
app.get('/', async (req, res) => {
    const allBlogs = await Blog.find({});
    return res.render('home', {
        user: req.user,
        blogs: allBlogs
    });
});

// External Routes
app.use('/user', userRoutes);
app.use('/blog', blogRoutes);

// Listen
app.listen(PORT, () => console.log(`Server Started At: 'http://localhost:${PORT}/'`));