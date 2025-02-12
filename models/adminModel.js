const db = require("../config/db");

const findUserByUsername = async (username, callback) => {
    const sql = "SELECT * FROM users WHERE username = ? "
    await db.query(sql, [username], (err,result) => {
        callback(err,result);
    })
}

const createUser = async (values, callback) => {
    const sql = "INSERT INTO users (`username`, `password`) VALUES (?, ?)";
    await db.query(sql, values,(err, result) => {
        callback(err, result);
    })
}

const findUserById = async (userId, callback) => {
    const sql = "SELECT * FROM users WHERE userid = ?";
    await db.query(sql,[userId], (err, result) => {
        callback(err, result)
    });
}

const deleteUserById = async (userId, callback) => {
    const sql = "DELETE FROM users WHERE userid = ?";

    await db.query(sql, userId, (err, result) => {
        console.log(`adminModel.js: ${result}`)
        callback(err,result)
    });
}

const patchUserById = async(values, callback) => {
    const sql = "UPDATE users SET password = ? , roles = ? WHERE userid = ?";

    await db.query(sql, values, (err, result) => {
        callback(err, result)
    });
}



module.exports = { deleteUserById, findUserById, findUserByUsername, createUser, patchUserById }