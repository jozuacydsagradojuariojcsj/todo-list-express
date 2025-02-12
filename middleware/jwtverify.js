require('dotenv').config();
const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET;


const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization');

    if(!token) {
        return res.status(401).json({error:'Unauthorized'})
    }

    jwt.verify(token.split(' ')[1], secretKey, (err,user) => {
        if (err) {
            return res.status(403).json({error: "Forbidden"});
        }

        req.user = user;
        next();
    });
};

module.exports = authenticateJWT;
