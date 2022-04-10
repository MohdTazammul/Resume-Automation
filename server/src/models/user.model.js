const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
    {
        name:{type:String, required:true},
        email:{type:String, required:true},
        password:{type:String, required:true}
    },
    {
        timestamps:true,
    }
);


userSchema.pre("save", function(next){
    if(!this.isModified("password")){
        return next();
    }

    var hash = bcrypt.hashSync(this.password, 8);
    this.password = hash;
    return next();
});


userSchema.methods.checkPassword = function (password){
    return bcrypt.compareSync(password, this.password);
}


module.exports = new mongoose.model("user", userSchema);