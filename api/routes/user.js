const User = require('../models/User');
const mongoose = require('mongoose');
const router = require('express').Router();
const bcrypt = require('bcrypt');

// READ A USER
router.get('/', async(req, res) => {
    const userId = req.query.userId;
    const username = req.query.username;

    try{
        const user = userId 
            ? await User.findById(userId) 
            : await User.findOne({ username: username });

        if(!user) return res.status(404).json({ 'error' : 'User not found!'});
        const { password, ...other } = user._doc;

        res.status(200).json(other);
    } catch(err){
        res.status(500).json(err);
    }
});

// UPDATE A USER
router.put('/:id', async(req, res) => {
    if(req.body.userId !== req.params.id) return res.status(403).json({ 'error' : 'You can only update your account!'});
    if(req.body.password){
        try{
            req.body.password = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10));
        } catch(err){
            res.status(500).json(err);
        }
    } 
    try{
        const updatedUser = await User.findByIdAndUpdate(req.body.userId, { $set: req.body });
        if(!updatedUser) return res.status(404).json({ 'error': 'User not found!'});

        res.status(200).json({ 'message' : 'Account had updated successfully'});
    } catch(err){
        res.status(500).json(err);
    }
});

// DELETE A USER
router.delete('/:id', async(req, res) => {
    if(req.body.userId !== req.params.id) return res.status(403).json({ 'error' : 'You can only delete your account!'});
    try{
        const deletedUser = await User.findByIdAndDelete(req.body.userId);
        if(!deletedUser) return res.status(404).json({ 'message' : 'User not found!'});

        res.status(200).json({ 'message': 'Account had deleted successfully'});
    } catch(err){
        res.status(500).json(err);
    }
}); 

// FOLLOW A USER
router.put('/:id/follow', async(req, res) => {
    if(req.body.userId === req.params.id) return res.status(403).json('You cannot follow yourself!');
    try{
        const currentUser = await User.findById(req.body.userId);
        const targetUser = await User.findById(req.params.id);
        if(!currentUser || !targetUser) return res.status(404).json({ 'message': 'User not found!'});

        if(targetUser.followers.includes(req.body.userId)) return res.status(409).json({ 'message' : 'You already follow this user!'});

        await currentUser.updateOne({ $push: { followings: req.params.id }});
        await targetUser.updateOne({ $push: { followers: req.body.userId }});
        
        res.status(200).json({ 'message' : 'You follow a new user successfully' });

    } catch(err){
        res.status(500).json(err);
    }
});

// UNFOLLOW A USER
router.put('/:id/unfollow', async(req, res) => {
    if(req.body.userId === req.params.id) return res.status(403).json('You cannot unfollow yourself!');
    try{
        const currentUser = await User.findById(req.body.userId);
        const targetUser = await User.findById(req.params.id);
        if(!currentUser || !targetUser) return res.status(404).json({ 'message': 'User not found!'});

        if(!targetUser.followers.includes(req.body.userId)) return res.status(409).json({ 'message' : 'You did not follow this user!'});

        await currentUser.updateOne({ $pull: { followings: req.params.id }});
        await targetUser.updateOne({ $pull: { followers: req.body.userId }});
        
        res.status(200).json({ 'message' : 'You unfollow a new user successfully' });

    } catch(err){
        res.status(500).json(err);
    }
});

// GET FRIENDS
router.get('/friend/:userId', async(req, res) => {
    try{
        const user = await User.findById(req.params.userId);

        if(!user){
            return res.status(404).json({ error: 'User not found' });
        }

        const friends = await Promise.all(
            user.followings.map((friendId) => {
                return User.findById(friendId);
            })
        );

        let friendList = [];
        friends.map((friend) => {
            const { _id, username, profilePicture } = friend;
            friendList.push({ _id, username, profilePicture });
        });

        res.status(200).json(friendList);
    } catch(err){
        res.status(500).json(err);
    }
}); 

module.exports = router;

