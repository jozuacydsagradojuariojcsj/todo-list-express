const db = require("../config/db");
const findUserById = require("../models/userModel");

const getUserById = async (req, res) => {
    try{
        const userId = req.params.id;
        const user = await findUserById(userId);

        return res.status(200).json({message: "OK", user});
    }catch(e){
        return res.status(500).json({error: `Internal Server Error ${e.message}`});
    }
    
}


module.exports = getUserById