const db = require("../config/db");

const findUserById = (userId) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM users WHERE userid = ?"
        db.query(sql, userId, (err,data) => {
            if(err){
                console.log(`Error on userModel: ${err}`);
                return reject(err);
            }
            return resolve(data);
        });
    });
}


module.exports = findUserById;