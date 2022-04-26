const express = require("express");
const User = require("../models/user.model");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const {body, validationResult} = require("express-validator");

const newToken=(user)=>{
    return jwt.sign({user}, `${process.env.MY_KEY}`)
}

router.get("", async(req, res)=>{
    try{
        const user = await User.find().lean().exec();
        res.send(user);
    }
    catch(e){
        res.send(e.message);
    }
});

router.post("/register",
body("firstName").isString().isLength({min:3, max:20}),
body("lastName").isString().isLength({min:3, max:20}),
body("email").isEmail().withMessage("Enter correct email format").custom(async (value)=>{
    const user =await User.find({email:value}).lean().exec();
    console.log(user)
    if(user.length>0){
        throw new Error('Email already exist, try another')
    }
    return true;
}),
body("password").isStrongPassword().withMessage("Password must contain uppercase and lowercase character, number and special symbols, password must be 8 characters long")
,
async(req, res)=>{
    try{
        let errors = validationResult(req);
        if(errors.errors.length>0){
            return res.send(errors);
        }
        
        let user = await User.find({email:req.body.email});
        // console.log(user);
        if(user.length>0){
            return res.send("User already exists, try another email");
        }

        user = await User.create(req.body);
        let token = newToken(user);
        res.send({user, token});
        
    }
    catch(e){
        res.send(e.message);
    }
});

router.post("/login", async(req, res)=>{
    try{
        const user = await User.find({email:req.body.email});

        if(user.length==0){
            
            return res.send({err:"User do not exist, Please try creating an account"});
        }
        if(user[0].checkPassword(req.body.password)){
            
            let token = newToken(user);
            res.send({user, token});
        }
        else{
            res.send({err:"Email or password not correct"});
        }
    }
    catch(e){
        res.send(e.message);
    }
});


module.exports=router;