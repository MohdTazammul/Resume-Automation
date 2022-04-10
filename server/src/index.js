const express = require("express");
const connect = require("../src/configs/db");
require("dotenv").config();
const PORT = process.env.PORT || 7000;
const app = express();
const Resume = require("../src/models/resume.model");

app.use(express.json());

app.get("/", (req, res)=>{
    try{
        res.send("Home")
    }
    catch(e){
        res.send(e.message);
    }
});
app.post("/resume", async(req, res)=>{
    try{
        console.log(req.body);
        const resume = await Resume.create(req.body);
        res.send(resume);
    }
    catch(e){
        res.send(e.message);
    }
})
app.get("/resume", async(req, res)=>{
    try{
        const resume = await Resume.find().lean().exec();
        res.send(resume);
    }
    catch(e){
        res.send(e.message);
    }
})

app.listen(PORT, ()=>{
    connect();
    console.log(`Listening at ${PORT}`);
})
