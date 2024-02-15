const Post = require('../models/Post');
const User = require('../models/User');
const router = require('express').Router();

// CREATE A POST 
router.post('/', async(req, res) => {
    try{
        const newPost = new Post(req.body);
        await newPost.save();
        res.status(200).json({ 'message' : 'Post saved successfully'});
    } catch(err){
        res.status(500).json(err);
    }
}); 

// READ A POST
router.get('/:id', async(req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        if(!post) return res.status(404).json({ 'error': 'Post not found!'});
        res.status(200).json(post);
    } catch(err){
        res.status(500).json(err);
    }
});

// UPDATE A POST 
router.put('/:id', async(req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        if(!post) return res.status(404).json({ 'error': 'Post not found!' });
        if(post.userId !== req.body.userId) return res.status(403).json({ 'error': 'You can only update your post!' });
        await Post.updateOne( { $set: req.body });
        res.status(200).json({ 'message' : 'Post updated successfully'});
    } catch(err){
        res.status(500).json(err);
    }
}); 

// DELETE A POST 
router.delete('/:id', async(req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        if(!post) return res.status(404).json({ 'error' : 'Post not found!'});
        if(req.body.userId !== post.userId) return res.status(403).json({ 'error' : 'You can only delete your post!'});
        await post.deleteOne();
        res.status(200).json({ 'message': 'Post deleted successfully'});
    } catch(err){
        res.status(500).json(err);
    } 
});

// LIKE / DISLIKE
router.put('/:id/like', async(req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        if(!post) return res.status(404).json({ 'message': 'Post not found' });
        if(post.like.includes(req.body.userId)){
            await post.updateOne({ $pull: { like: req.body.userId }});
            res.status(200).json({ 'message': 'Dislike successfully'});
        } else{ 
            await post.updateOne( { $push: { like: req.body.userId }});
            res.status(200).json({ 'message': 'Like successfully'});
        }
    } catch(err){
        res.status(500).json(err);
    }
});

// GET TIMELINE POSTS
router.get("/timeline/:userId", async(req, res) => {
    try{
        const currentUser = await User.findById(req.params.userId);
        const userPosts = await Post.find({ userId: currentUser._id });
        const friendPosts = await Promise.all(
            currentUser.followings.map(friendId => {
                return Post.find({ userId: friendId });
            })
        );
        res.status(200).json(userPosts.concat(...friendPosts));
    } catch(err){
        res.status(500).json(err);
    }
});

// GET USER'S ALL POSTS
router.get("/profile/:username", async(req, res) => {
    try{
        const user = await User.findOne({ username: req.params.username });
        const posts = await Post.find({ userId: user._id });
        res.status(200).json(posts);
    } catch(err){
        res.status(500).json(err);
    }
}); 

module.exports = router;