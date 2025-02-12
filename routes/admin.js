const express = require("express")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const router = express.Router()
const db = require("../db");
const authenticateJWT = require("../middleware/jwtverify");
const checkAdmin = require("../middleware/verifyadmin");

router.
route("/user/:id").
delete(authenticateJWT, checkAdmin, (req,res) => {
    const sql = "DELETE FROM users WHERE userid = ?";
    const values = req.params.id;

    db.query(sql, values, (err, data) => {
        if(err){
            return res.status(500).json({error: `Internal Server Error: ${err}`});
        }else{
            return res.status(200).json({message: `Deleted User Sucessfully`});
        }
    });

}).get(authenticateJWT,checkAdmin,(req,res) => {
    const sql = "SELECT * FROM users WHERE userid = ?";
    const values =  req.params.id;

    db.query(sql, values,(err,data) => {
        if(err){
            return res.status(500).json({error: `Internal Server Error: ${err}`});
        }
        if(data.length === 1){
            const user  = data[0];
            return res.status(200).json({message: "OK", user})
        }
    })

}).patch(authenticateJWT,checkAdmin, async (req, res) => {
    const sql =  "UPDATE users SET password = ? , roles = ? WHERE userid = ?";
    const {password, roles}  = req.body; 
    const userid = req.params.id;

    const hashedPassword = await bcrypt.hash(password,10);
    const values = [hashedPassword, roles, userid];

    db.query(sql, values,(err,data) => {
        if(err) {
            return res.status(500).json({error: `Internal Server Error: ${err}`});
        }
        return res.status(200).json({message: "User Updated Successfully"});

    });
});



//admin 
router.post(("/user/create"),authenticateJWT,checkAdmin,(req, res) => {
    const sql = "SELECT * FROM users WHERE username = ?"
    const values = req.body.username;

    db.query(sql,values, async (err,data) => {

        if(data.length > 0) {
            return res.status(409).json({error: "Username already exist"})
        }else{
            const {username, password} = req.body;
            const hashedPassword = await bcrypt.hash(password,10);
            const sql = "INSERT INTO users (`username`,`password`) VALUES (?, ?)";
            const values = [username, hashedPassword];
            db.query(sql,values,(err, data) =>{
                if(err){
                    return res.status(500).json({error:`Database Error, ${err}`});
                }
                return res.status(201).json({message: "User Created"});
            });
        }
        if(err){
            return res.status(500).json({error:`Database Error, ${err}`});
        }
    });
})


module.exports = router 