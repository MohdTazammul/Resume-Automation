const express = require("express");
const Resume = require("../models/resume.model");
const router = express.Router();

router.get("/", (req, res)=>{
    try{
        res.send("Home")
    }
    catch(e){
        res.send(e.message);
    }
});

router.post("", async(req, res)=>{
    try{
        console.log(req.body);
        const resume = await Resume.create(req.body);
        res.send(resume);
    }
    catch(e){
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
        const resume = await Resume.findById(req.params.id).lean().exec();
        res.send(resume);
    }
    catch(e){
        res.send(e.message);
    }
});


module.exports = router;
