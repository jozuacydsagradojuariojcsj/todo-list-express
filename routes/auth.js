const express = require("express")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const router = express.Router()
const db = require("../db");

require('dotenv').config()

const secretKey = process.env.JWT_SECRET;
const expires = process.env.EXPIRY;

//login
router.post('/login', (req,res)=>{
    console.log("Received Request Body:",req.body);
    const sql = "SELECT * FROM users WHERE `username` = ?";
    const values = [
        req.body.username,
    ]
    db.query(sql, values, (err, data) => {
        if(err) {
            return res.status(500).json({error: `Database Error, ${err}`});
        }

        if(data.length === 0) {
            return res.status(404).json({message: "User Not Found"});
        }

        const user = data[0];
        

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
    });
});

module.exports = router