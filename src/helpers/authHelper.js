const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secretKey = process.env.JWT_SECRET;
const expires = process.env.EXPIRY;

const comparePassword = (req, res, user ) => {
    bcrypt.compare(req.body.password, user.password, async (err, result) => {
        if (err) {
            return res.status(500).json({error: `Error Verifying Password, ${err}`});
        }

        if (result) {
            const token = jwt.sign({id:user.id, username:user.username, roles:user.roles},secretKey,{expiresIn: expires});
            console.log(token)
            return res.status(200).json({message: "Login Successful", user});
        }else{
            return res.status(401).json({error: `Incorrect Password, ${err}`});
        }
    });
}

module.exports = { comparePassword };