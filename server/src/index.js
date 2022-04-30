const express = require("express");
const connect = require("../src/configs/db");
require("dotenv").config();
const PORT = process.env.PORT || 4567;
const app = express();
const path=require("path")
const ResumeController = require("./controllers/resume.controller");
const UserController = require("./controllers/user.controller")

var cors = require('cors')
app.use(cors());

app.use(express.json());
app.use(express.static(path.join(__dirname, "./public")));

app.use("/resume", ResumeController);
app.use("/user", UserController);


app.listen(PORT, ()=>{
    connect();
    console.log(`Listening at ${PORT}`);
})
