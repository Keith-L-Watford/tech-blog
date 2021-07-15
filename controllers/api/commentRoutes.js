const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    try {
        const newComment = await Post.create({
            ...req.body,
            post_id: req.session.post_id
        });

        res.status(200).json(newComment);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const comment = await Post.destroy({
           where: {
               id: req.params.id,
               post_id: req.session.post_id,
           }
        });
        
        if (!comment) {
            res.status(404).json({ message: 'Comment could not be deleted. Please try again.'});
            return;
        }

        res.status(200).json(cpmment);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;