const { getUserByUsername } = require("../models/authModel");
const { comparePassword } = require("../helpers/authHelper");
require('dotenv').config()

const loginController = async (req,res) => {
    try{
        const {identifier, password} = req.body;
        console.log(`Request Body: ${JSON.stringify(req.body)}`)

        if(!identifier || !password) {
            return res.status(400).json({error: "Missing username or email or password"});
        }

        const user = await getUserByUsername(identifier);
        comparePassword(req,res,user)
    }catch(e){
        return res.status(500).json({error: `Internal Server Error: ${e}`})
    }

}

module.exports = { loginController } 