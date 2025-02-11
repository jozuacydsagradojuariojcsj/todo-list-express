const express = require("express")
const bcrypt = require("bcrypt");
const router = express.Router()

const db = require("../db");


//register
router.post('/create', async (req,res)=>{
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
});



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
                return res.status(200).json({message: "Login Successful", user});
            }else{
                return res.status(401).json({error: `Incorrect Password, ${err}`});
            }
        });
    });
});

module.exports = router