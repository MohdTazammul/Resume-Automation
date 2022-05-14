const express = require("express");
const Resume = require("../models/resume.model");

const router  = express.Router();

router.post("", async(req, res)=>{
    try{
        const resume = await Resume.create(req.body);
        console.log(resume);
        res.send(resume);
    }
    catch(e){
        console.log(e.message)
        res.send(e.message);
    }
});

router.get("", async(req, res)=>{
    try{
        const resume = await Resume.find().lean().exec();
        res.send(resume);
    }
    catch(e){
        res.send(e.message);
    }
});

router.get("/:id", async(req, res)=>{
    try{
        const resume = await Resume.find({user:req.params.id}).lean().exec();
        res.send(resume);
    }
    catch(e){
        res.send(e.message);
    }
});


module.exports = router;
