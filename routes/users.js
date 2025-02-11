const express = require("express")
const mysql = require('mysql')
const cors = require('cors')

const router = express.Router()

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "todo",
});


router.post('/auth/create', (req,res)=>{
    const sql = "INSERT INTO users (`username`,`password`) VALUES (?)";

    const values = [
        req.body.username,
        req.body.password
    ]

    db.query(sql,[values], (err,data) => {
        if(err){
            return res.json("Error");
        }
        return res.json(data);
    })
})

router.post('/auth/login',(req,res)=>{
    const sql = "SELECT * FROM users WHERE `username` = ?";
    const values = [
        req.body.username,
        req.body.password
    ]
    db.query(sql, values.username, (err, data) => {
        if(err) {
            return res.json('Error');
        }

        if(data.length == 1) {
            
        }

    })
})





















router.get("/",(req, res) => {
    res.send("User List")
});

router.get("/new",(req, res) => {
    res.send("User New Form")
});

router.post("/", (req,res) => {
    res.send("Create User")
});

router.
route("/:id").
get((req,res)=>{
    console.log(req.user.name)
    res.send(`Get User with ID ${req.params.id}`)
}).put((req,res)=>{
    res.send(`Update User with ID ${req.params.id}`)
}).delete((req,res) => {
    res.send(`Delete USer with ID ${req.params.id}`)
});

const users  = [{name:"Kyle"},{name:"Sally"}]

router.param("id", (req, res, next, id) => {
    console.log(id)
    req.user = users[id]
    next()
});



module.exports = router


