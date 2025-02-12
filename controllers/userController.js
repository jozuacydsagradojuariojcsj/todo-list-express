const db = require("../config/db");
const findUserById = require("../models/userModel");

const getUserById = (req,res) => {
    const userId = req.params.id;
    findUserById(userId, (err, data) =>{
        if(err){
            return res.status(500).json({error: `Internal Server Error: ${err}`});
        }
        if(data.length === 1){
            const user  = data[0];
            console.log(userId);
            return res.status(200).json({message: "OK", user})
        }
    })
}

module.exports = getUserById