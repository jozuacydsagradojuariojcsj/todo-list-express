const db = require("../config/db");


const findUserByUsername = (username, email) => {
    return new Promise((resolve, reject) =>{
        const sql = "SELECT * FROM users WHERE username = ? or email = ?";
        db.query(sql, [username, email], (err, data)=>{
            if(err){
                console.log(`Error on adminModel: ${err}`);
                return reject(err);
            }
            if(data.length > 0) {
                console.log(`adminModel found username ${data[0].username} and email ${data[0].email}`)
                return resolve(data[0])
            }
            console.log("Username not found in db");
            return resolve(null);
        });
    });
}

const createUser = (values) => {
    return new Promise((resolve, reject)=> {
        const sql = "INSERT INTO users (`username`,`password`, `email`) VALUES (?, ?, ?)";
        db.query(sql, values,(err,data) => {
            if(err){
                console.log(`Error on adminModel: ${err}`)
                return reject(err);
            }
            console.log(`User Data createUser Model: ${data}`);
            return resolve(data);
        });
    });
}

const findUserById = (userId) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM users WHERE userid = ?"
        db.query(sql, userId, (err, data) => {
            if(err){
                console.log(`Error on DB: ${err}`);
                return reject(err);
            }
            if(data.length === 1){
                const user  = data[0];
                return resolve(user);
            }else{
                return reject(err);
            }
        });
    });
}

const deleteUserById = (userId) => {
    return new Promise((resolve, reject) => {
        const sql = "DELETE FROM users WHERE userid = ?";
        db.query(sql, userId, (err,data) => {
            if(err){
                console.log(`Error on DB: ${err}`);
                return reject(err);
            }
            return resolve(data);
        });
    });

}

const patchUserById = (userId,values) => {
    return new Promise((resolve, reject) => {

        let sql = "UPDATE users SET ";
        let fields = [];
        let sqlValues = [];

        if(values.username){
            fields.push("username = ?");
            sqlValues.push(username.password);
        }
        if(values.password){
            fields.push("password = ?");
            sqlValues.push(values.password);
        }
        if(values.roles){
            fields.push("roles = ?");
            sqlValues.push(values.roles);
        }
        if(fields.length === 0){
            return reject(new Error("No Fields to Update"));
        }
        
        sql += `${fields.join(", ")} WHERE userid = ?`
        sqlValues.push(userId);

        db.query(sql, sqlValues, (err, data) => {
            if(err){
                console.log(`Error on Models DB: ${err}`);
                return reject(err);
            }
            return resolve(data);
        })
    });

    
}

//using username or email malogin si user

// const patchUserById = async(values, callback) => {
//     const sql = "UPDATE users SET password = ? , roles = ? WHERE userid = ?";

//     await db.query(sql, values, (err, result) => {
//         callback(err, result)
//     });
// }



module.exports = { deleteUserById, findUserById, findUserByUsername, createUser, patchUserById }