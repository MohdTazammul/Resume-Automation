const express = require("express");
const connect = require("../src/configs/db");
require("dotenv").config();
const PORT = process.env.PORT || 4567;
const app = express();
const Resume = require("../src/models/resume.model");

var cors = require('cors')
app.use(cors());

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
app.get("/resume/:id", async(req, res)=>{
    try{
        const resume = await Resume.findById(req.params.id).lean().exec();
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
