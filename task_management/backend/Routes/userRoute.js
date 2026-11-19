const express = require('express');
const router = express.Router();

const User = require('../models/userSchema');

router.post('/api/user', async (req,res)=>{
    const {name,email}=req.body;
    if (!name || !email){
        res.status(400).json({message:"Fields are missing"});
    }
    const newUser=await User.create({
        name:name,
        email:email
    });
    if (!newUser){
        res.status(400).json({message:"Failed adding user"});
    }
    res.status(200).json({message:"Successfully added user"});
})