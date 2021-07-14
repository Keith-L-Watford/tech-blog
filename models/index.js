const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment') 

User.hasmany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

Post.belongsto(User, {
    foreignKey: 'user_id',
});

Post.hasmany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE',
});

Comment.belongsto(Post, {
    foreignKey: 'post_id',
});

module.exports = { User, Post, Comment };