const db = require("../config/db");

const findUserById = (userId, callback) => {
    const sql = "SELECT * FROM users WHERE userid = ?";
    
    db.query(sql, [userId],(err,result) => {
        callback(err,result);
    });
}

module.exports = findUserById;