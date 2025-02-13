const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const { deleteUserById , findUserById, findUserByUsername, createUser, patchUserById} = require("../models/adminModel");
const { comparePassword } = require("../helpers/authHelper");


const adminCreateUser = async (req,res) => {

    try{
        const username = req.body.username;
        const email = req.body.email;

        if(!username || !email){
            return res.status(500).json({error: "Missing Username, Email or Password"});
        }

        const user  = await findUserByUsername(username, email);

        if(user) {
            return res.status(409).json({message: "Username or Email already exists"});
        }else{
            const {username, password} = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            const values = [username, hashedPassword, email]
            createUser(values);

            return res.status(201).json({message: "User Created Successfully"});
        }
    }catch(e){
        console.log(e);
        return res.status(500).json({error:`Internal Server Error: ${e}`});
    }
}

//dungag ug validation dapat ang format sa email naay @gmail.com etc.
//sa password dapat naay special character uppercase ug lowercase dayon minimum of 8 characters 

const adminGetUser = async (req,res) => {
    try{
        const userId = req.params.id;
        const user = await findUserById(userId);

        return res.status(200).json({message: "OK", user})
    }catch(e){
        return res.status(500).json({error: `Internal Server Errors: ${JSON.stringify(e)}`})
    }
}

const adminPatchUser = async(req,res) => {
    try{
        const {password, roles} = req.body;
        const userId = req.params.id;

        const hashedPassword = await bcrypt.hash(password,10);
        const values = [hashedPassword, roles, userId];

        const updatedUser = await patchUserById(values);
        console.log(updatedUser.affectedRows);

        return res.status(200).json({message: "User Updated Sucessfully"});
    }catch(e){
        return res.status(500).json({error: `Internal Server Error: ${e.message}`});

    }
}

// const adminPatchUser = async (req,res) => {
//     const {password, roles}  = req.body; 
//     const userid = req.params.id;

//     const hashedPassword = await bcrypt.hash(password,10);
//     const values = [hashedPassword, roles, userid];

//     patchUserById(values, (err,data) => {
//         if(err) {
//             return res.status(500).json({error: `Internal Server Error: ${err}`});
//         }
//         return res.status(200).json({message: "User Updated Successfully"});
//     });
// }

const adminDeleteUser = async (req, res) => {

    try{
        const userId = req.params.id;
        await deleteUserById(userId);
        return res.status(200).json({message: "User Deleted Succesfully"});
    }catch(e){
        return res.status(500).json({error: `Internal Server Error: ${e.message}`})

    }
}

module.exports = { adminCreateUser, adminGetUser, adminPatchUser, adminDeleteUser };