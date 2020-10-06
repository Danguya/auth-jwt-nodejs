const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const { registerValidation, loginValidation } = require('../validation');



router.post('/register', async (req, res)=>{
    
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //checking if the user is already in the database
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('Email already exists');

    //Hash Passwords
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);


    //create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    });
    

    try {
        const savedUser = await user.save();
        res.send(savedUser._id);
        
        
    } catch (err) {
        res.status(400).send(err);

    }
    console.log(user);
});

router.post('/login',async(req,res)=>{
    //LETS VALIDATE THE DATA BEFORE WE A USER
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //checking if the email exists
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Email is not found');
    //PASSWORD IS CORRECT
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Invalid password');
    
    res.send({"message":"Logged in"});

});

module.exports = router;