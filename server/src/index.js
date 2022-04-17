const express = require("express");
const connect = require("../src/configs/db");
require("dotenv").config();
const PORT = process.env.PORT || 4567;
const app = express();
const ResumeController = require("./controllers/resume.controller");


var cors = require('cors')
app.use(cors());

app.use(express.json());

app.use("/resume", ResumeController);


app.listen(PORT, ()=>{
    connect();
    console.log(`Listening at ${PORT}`);
})
