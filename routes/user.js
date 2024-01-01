const { Router } = require('express');
const User = require('../models/user');

// Define
const router = Router();

// Routes
router.get('/login', async (req, res) => {
    return res.render('login');
});

router.get('/signUp', async (req, res) => {
    return res.render('signup');
});

router.get('/logout', (req, res) => {
    return res.clearCookie('Token').redirect('/');
});

router.post('/login', async (req, res) => {
    try {
        const { Email, Password } = req.body;
        const token = await User.matchPasswordAndGenerateToken(Email, Password);

        return res.cookie('Token', token).redirect('/');
    } catch (error) {
        return res.render('login', {
            error
        });
    }
});

router.post('/signUp', async (req, res) => {
    const { FullName, Email, Password } = req.body;
    await User.create({
        FullName,
        Email,
        Password
    });
    return res.redirect('/');
});

// Export
module.exports = router;