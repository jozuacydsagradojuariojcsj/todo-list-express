const db = require("../config/db");


const getUserById = (userId) => {
    return new Promise((resolve,reject) => {
        const sql = "SELECT * FROM users WHERE userid = ?";
        db.query(sql, userId,(err, data) => {
            if(err){
                return reject(err);
            }
            if(data.length > 0){
                return resolve(data[0]);
            }
            return reject(err);
        });
    });
}

const getTodoById = (todoId) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM todos WHERE id = ?";
        db.query(sql,todoId,(err,data) => {
            if(err){
                return reject(err);
            }
            if(data.length > 0) {
                return resolve(data[0]);
            }
            return reject(err);
        });
    });
}

const createTodoByUserId = (userId, values) => {
    return new Promise((resolve, reject) => {
        const sql = "INSERT INTO todos (`userid`, `todotext`) VALUES (?, ?)";
        db.query(sql,[userId, values], (err,data) => {
            if(err){
                return reject(err);
            }
            return resolve(data);
        })
    });
}

const updateTodoByPostId = (postId, values) => {
    return new Promise((resolve, reject) => {
        const sql = "UPDATE todos SET todotext = ? WHERE id = ?";
        db.query(sql, [postId, values], (err,data) => {
            if(err){
                return reject(err);
            }
            return resolve(data);
        });
    });
}

module.exports = { createTodoByUserId, updateTodoByPostId, getUserById, getTodoById };