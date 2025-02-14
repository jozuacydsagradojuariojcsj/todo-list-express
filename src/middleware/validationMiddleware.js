const { StatusCodes } = require("http-status-codes");
const z = require('zod');

const createUserValidation = (schema) => {
    return (req, res, next) => {
        try{
            schema.parse(req.body);
            next();
        }catch(e){
            if(e instanceof z.ZodError) {
                const errorMessages = e.errors.map((issue) => ({
                    message: `${issue.path.join('.')} is ${issue.message}`,
                }));
                res.status(StatusCodes.BAD_REQUEST).json({error: "Invalid Data", details: errorMessages});
            }else{
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: "Internal Server Error"})
            }
        }
    }
    
}

const updateUserValidation = (schema) => {
    return (req, res, next) => {
        try{
            const userId = Number(req.params.id);
            if(isNaN(userId)) {
                return res.status(StatusCodes.BAD_REQUEST).json({error: "Invalid User ID"});
            }

            schema.parse({userId, ...req.body});

            next();

        }catch(e){
            if(e instanceof z.ZodError) {
                const errorMessages = e.errors.map((issue) => ({
                    message: `${issue.path.join('.')} is ${issue.message}`,
                }));
                return res.status(StatusCodes.BAD_REQUEST).json({error: "Invalid Data", details: errorMessages});
            }else{
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: "Internal Server Error"});
            }
        }
    }
}

const createTodoValidation = (schema) => {
    return (req, res, next) => {
        try{

            const userId = Number(req.params.id);
            if(isNaN(userId)) {
                return res.status(StatusCodes.BAD_REQUEST).json({error: "Invalid User ID"});
            }

            schema.parse({userId, ...req.body});

            next();

        }catch(e){

            if(e instanceof z.ZodError) {
                const errorMessages = e.errors.map((issue) => ({
                    message: `${issue.path.join('.')} is ${issue.message}`,
                }));
                return res.status(StatusCodes.BAD_REQUEST).json({error: "Invalid Data", details: errorMessages, e: e.message});
            }else{
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: "Internal Server Error"});
            }
        }
        
    }
}

module.exports = { createUserValidation, updateUserValidation, createTodoValidation };