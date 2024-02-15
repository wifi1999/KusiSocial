const User = require('../models/User');
const router = require('express').Router();
const bcrypt = require('bcrypt');

// REGISTER
router.post('/register', async(req, res) => {
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10));
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });
        const user = await newUser.save();

        res.status(200).json(user);
    } catch(err){
        res.status(500).json(err);
    }
});

// LOGIN
router.post('/login', async(req, res) => {
    try{
        const user = await User.findOne({ email: req.body.email });
        if(!user) return res.status(404).json({ 'error': 'User Not Found!'});
        
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        !validPassword && res.status(401).json({ 'error': 'Wrong Password!'});

        res.status(200).json(user);
    } catch(err){
        res.status(500).json(err);
    }
}); 

module.exports = router;