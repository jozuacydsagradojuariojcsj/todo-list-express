const { createTodoByUserId, getUserById, getTodoById, updateTodoByPostId } = require("../models/todoModel");

const createTodo = async (req, res) => {
    try{
        const userId = req.params.id;
        const todoText = req.body;

        const user = await getUserById(userId);

        if(user) {
            await createTodoByUserId(userId,todoText);
            return res.status(200).json({message: "Created Todo Successfully"});
        }else{
            return res.status(404).json({error: "User Not Found"});
        }
    }catch(e){
        return res.status(500).json({error: `Internal Server Error: ${e}`});
    }
}

const patchTodoById = async(req,res) => {
    try{
        const todoId = req.params.id;
        const todoText = req.body;

        const todos = await getTodoById(todoId);

        if(todos){
            await updateTodoByPostId(todoId,todoText);
            return res.status(200).json({message: "Todo Updated Successfully"});
        }else{
            return res.status(404).json({error: "Todo not found"});
        }
    }catch(e){
        return res.status(500).json({error: `Internal Server Error: ${e}`});
    }
}

module.exports = { createTodo, patchTodoById };