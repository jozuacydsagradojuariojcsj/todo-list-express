const db = require("../config/db");

const getUserByUsername = (identifier) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM users WHERE username = ? OR email = ?";
        db.query(sql,[identifier, identifier], (err, data) => {
            if(err){
                return reject(err);
            }
            if(data.length > 0){
                const user = data[0];
                return resolve(user)
            }else{
                return reject(err);
            }
        });
    });
}

// const getUserByUsername = (username, callback) => {
//     const sql = "SELECT * FROM users WHERE username = ?";

//     db.query(sql, username,(err, result) => {
//         callback(err, result);
//     });
// }


module.exports = { getUserByUsername };