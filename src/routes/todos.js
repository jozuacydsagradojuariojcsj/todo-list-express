const express = require('express');
const router = express.Router()

const authenticateJWT = require("../middleware/jwtverify");

const { patchTodoById, createTodo } = require('../controllers/todoController');
const { createTodoValidation } = require('../middleware/validationMiddleware');
const { createTodoSchema } = require('../../schemas/todoSchema');

router.
route("/:id")
.post(authenticateJWT,createTodoValidation(createTodoSchema),createTodo)
.patch(authenticateJWT,patchTodoById)


module.exports = router;