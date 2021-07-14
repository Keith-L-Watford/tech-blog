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
                    attributes: username,
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
                    attributes: username,
                }
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



module.exports = router;