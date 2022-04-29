const mongoose = require("mongoose");

module.exports = async ()=>{
    await mongoose.connect("mongodb+srv://resume-app:tazammul@cluster0.uoq3f.mongodb.net/Resume-Automation-DB?retryWrites=true&w=majority")
}