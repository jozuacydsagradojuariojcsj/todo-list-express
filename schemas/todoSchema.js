const z = require("zod");

const createTodoSchema = z.object({
    userId: z.number({required_error: "User ID is required"}),
    todotext: z.string().min(1,"Todo Text, must contain at least one character"),
});

const updateTodoSchema = z.object({
    todotext: z.string().min(1,"The Updated Field must have at least one character"),
});

module.exports = { createTodoSchema, updateTodoSchema };