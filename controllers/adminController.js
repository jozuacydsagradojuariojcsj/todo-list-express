const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const { deleteUserById , findUserById, findUserByUsername, createUser, patchUserById} = require("../models/adminModel");


const adminCreateUser = (req,res) => {
    const username = req.body.username;
    findUserByUsername(username, async (err, data) => {
        if(data.length > 0) {
            return res.status(409).json({error: "Username already exist"})
        }else{
            const {username, password} = req.body;
            console.log(`Password Admin Controller: ${password}`);
            const hashedPassword = await bcrypt.hash(password,10);
            const values = [username, hashedPassword];
            createUser(values, (err,data)=>{
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
}

const adminGetUser = (req,res) => {
    const userId = req.params.id;
    findUserById(userId, (err,data) => {
        if(err){
            return res.status(500).json({error: `Internal Server Error: ${err}`});
        }
        if(data.length === 1){
            const user = data[0];
            return res.status(200).json({message: "OK", user})
        }else{
            return res.status(404).json({error: "User not Found"});
        }
    });
}

const adminPatchUser = async (req,res) => {
    const {password, roles}  = req.body; 
    const userid = req.params.id;

    const hashedPassword = await bcrypt.hash(password,10);
    const values = [hashedPassword, roles, userid];

    patchUserById(values, (err,data) => {
        if(err) {
            return res.status(500).json({error: `Internal Server Error: ${err}`});
        }
        return res.status(200).json({message: "User Updated Successfully"});
    });
}

const adminDeleteUser = (req, res) => {
    const userId = req.params.id;
    deleteUserById(userId, (err,data) => {
        if(err){
            return res.status(500).json({error: `Internal Server Error: ${err}`});
        }else{
            return res.status(200).json({message: "User Sucessfully Deleted"});
        }
    });
}

module.exports = { adminCreateUser, adminGetUser, adminPatchUser, adminDeleteUser };