// import {send_email} from "./aws-utils";
// send_email = require("./aws_utils");
const express = require("express");
const User = require("../models/user.model");
const router = express.Router();
const jwt = require("jsonwebtoken");
var crypto = require("crypto");
var AWS = require('aws-sdk');

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
            
            return res.send({err:"User does not exist, Please try creating an account"});
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


router.post("/forgot-password", async(req, res)=>{
    try{
        const user = await User.find({email:req.body.email});

        if(user.length===0){
            return res.send({err:"User does not exist, Please try creating an account"});
        }
        if(user[0].email){
            var random_password = crypto.randomBytes(6).toString('hex');

            User.updateOne({email: req.body.email}, 
                {
                    $set: {
                        password: random_password,
                    }
                } )
            send_email(req.body.email, random_password);
            res.send("Please check your email for new password!")
        }
        else{
            res.send({err:"Email not available!"});
        }
    }
    catch(e){
        res.send(e.message);
    }
});

function send_email(email, password){
    AWS.config.update({region: 'ap-south-1'});

    var params = {
    Destination: { /* required */
        ToAddresses: [
        email,
        ]
    },
    Message: { /* required */
        Body: { /* required */
        Html: {
        Charset: "UTF-8",
        Data: "Your new password is " + password
        },
        Text: {
        Charset: "UTF-8",
        Data: "Your new password is " + password,
        }
        },
        Subject: {
        Charset: 'UTF-8',
        Data: 'Password Reset'
        }
        },
    Source: 'lohit@masaischool.com',
    };

    // Create the promise and SES service object
    var sendPromise = new AWS.SES({apiVersion: '2010-12-01'}).sendEmail(params).promise();

    // Handle promise's fulfilled/rejected states
    sendPromise.then(
    function(data) {
        console.log(data.MessageId);
        return;
    }).catch(
        function(err) {
        console.error(err, err.stack);
        return;
    });

}

module.exports=router;