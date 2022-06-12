
const nodemailer = require("nodemailer")
const express = require("express");
const User = require("../models/user.model");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

function verifyToken(token){
    return new Promise((resolve, reject)=>{
        jwt.verify(token, `${process.env.MY_KEY}`, (err, user)=>{
            if(err){
                return reject(err);
            }

            resolve(user);
        })
    })
}


const { body, validationResult } = require("express-validator");

const newToken = (user) => {
    
  return jwt.sign({ user }, `${process.env.MY_KEY}`);
};

router.get("", async (req, res) => {
  try {
    const user = await User.find().lean().exec();
    res.send(user);
  } catch (e) {
    res.send(e.message);
  }
});

router.post(
  "/register",
  body("firstName").isString().isLength({ min: 3, max: 20 }),
  body("lastName").isString().isLength({ min: 3, max: 20 }),
  body("email")
    .isEmail()
    .withMessage("Enter correct email format")
    .custom(async (value) => {
      const user = await User.find({ email: value }).lean().exec();
      console.log(user);
      if (user.length > 0) {
        throw new Error("Email already exist, try another");
      }
      return true;
    }),
  body("password")
    .isLength({min:4})
    .withMessage("Password should be of atleast 4 characters"),
  async (req, res) => {
    try {
      let errors = validationResult(req);
      if (errors.errors.length > 0) {
        return res.send(errors);
      }

      let user = await User.find({ email: req.body.email });

      if (user.length > 0) {
        return res.send("User already exists, try another email");
      }

      user = await User.create(req.body);
      let token = newToken(user);
      res.send({ user, token });
    } catch (e) {
      res.send(e.message);
    }
  }
);

router.post("/update-password/:token", async(req, res)=>{
    try{
        const user = await verifyToken(req.params.token);
        console.log(user)
        var hash = bcrypt.hashSync(req.body.password, 8);
        const thisUser = await User.findOneAndUpdate(
            { email: user.user.email },
            { password: hash },
            { new: true }
          );
            return res.send(thisUser);
    }
    catch(e){
        res.send(e.message);
    }
})

router.post("/login", async (req, res) => {
  try {
    const user = await User.find({ email: req.body.email });

    if (user.length == 0) {
      return res.send({
        err: "User does not exist, Please try creating an account",
      });
    }
    if (user[0].checkPassword(req.body.password)) {
      let token = newToken(user);
      res.send({ user, token });
    } else {
      res.send({ err: "Email or password not correct" });
    }
  } catch (e) {
    res.send(e.message);
  }
});


router.post("/forgot-password", async (req, res) => {
  try {
    
    const user = await User.find({ email: req.body.email });
    
    if (user.length === 0) {
      return res.send({
        err: "User does not exist, Please try creating an account",
      });
    }
    if (user[0].email) {
        let token = newToken(user[0]);

      send_email(req.body.email, token);
      return res.send("Email sent successfully");
    } else {
      res.send({ err: "Email not available!" });
    }
  } catch (e) {
      console.log(e)
    res.send(e.message);
  }
});

function send_email(email, token) {
    
    let mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: `${process.env.SOURCE}`,
            pass: `${process.env.PASS}`
        }
    });
    
    let mailDetails = {
        from: 'abhishek.maurya@masaischool.com',
        to: email,
        subject: 'Password Update',
        text: `https://tempresume.vercel.app/forgot-password/${token}`
    };
    
    mailTransporter.sendMail(mailDetails, function(err, data) {
        if(err) {
            console.log(err)
            console.log('Error Occurs');
        } else {
            console.log('Email sent successfully');
        }
    });
  };  

module.exports = router;
