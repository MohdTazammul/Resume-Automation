const mongoose = require("mongoose");


module.exports = async ()=>{
    await mongoose.connect("mongodb+srv://production-server:xDYolWakwgtsRvj9@cluster0.9iuol.mongodb.net/?retryWrites=true&w=majority")
}