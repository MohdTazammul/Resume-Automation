const jwt = require("jsonwebtoken");
require("dotenv").config();

function verifyToken(token){
    return new Promise((resolve, reject)=>{
        jwt.verify(token, process.env.JWT_KEY, (err, user)=>{
            if(err){
                return reject(err);
            }

            resolve(user);
        })
    })
}

const authenticate = async (req, res, next)=>{

    if(!req.headers.authorization){
        res.send("Headers not found or invalid");
    }

    if(!req.headers.authorization.startsWith("Bearer ")){
        res.send("Headers not found or invalid");
    }

    let token = req.headers.authorization.split("Bearer ")[1];

    let user;
    try{
        user = await verifyToken(token);
    }

    catch(e){
        res.send(e.message);
    }

    req.user = user.user;
    return next();

}

module.exports = authenticate;