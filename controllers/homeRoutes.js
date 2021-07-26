// I feel like although the majority of this is is the world of right, I might need to start over
const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

// get all posts
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findall({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                }
            ],
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// get post by ID
router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ["username"],
                },
                {
                    model: Comment
                },
            ],
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('post', {
            ...posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// profile page
router.get('/profile', withAuth, async (req, res) => {
    try {
       
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Post }],
        });

        const user = userData.get({ plain: true });
        res.render('profile', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// POST profile
// ===============

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/profile');
        return;
    }
    res.render('login');
});

module.exports = router;