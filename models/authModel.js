const db = require("../config/db");

const getUserByUsername = (username, callback) => {
    const sql = "SELECT * FROM users WHERE username = ?";

    db.query(sql, username,(err, result) => {
        callback(err, result);
    });
}


module.exports = { getUserByUsername };