const User = require('./User');
const Post = require('./Post');

User.hasmany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Post.belongsto(User, {
    foreignKey: 'user_id',
});

module.exports = { User, Post };