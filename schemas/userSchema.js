const z = require("zod");

//dungag ug validation dapat ang format sa email naay @gmail.com etc.
//sa password dapat naay special character uppercase ug lowercase dayon minimum of 8 characters 

const createUserSchema = z.object({
    email: z.string({required_error: "Email Field is Missing"}).email(),
    username: z.string({required_error: "Username Field is Missing"}).min(5,"Username must be 5 characters or more"),
    password: z.string({required_error: "Password Field is Missing"}).min(8, "Password must be at lesat 8 characters long")
    .regex(/[A-Z]/, "Password must at least have one uppercase letter")
    .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must at least have one special Character"),
});


const updateUserSchema = z.object({
    userId: z.number({required_error: "User Id is Missing"}),
    username: z.string().min(5, "Username must be 5 characters or more").optional(),
    password: z.string().min(8,"Password must be at least 8 characters long").optional(),
    roles: z.enum(["admin","user"]).optional(),
});


const loginUserSchema = z.object({
    identifier: z.union([
        z.string().email("Invalid Email Format"),
        z.string().min(5,"Username must be at least 5 characters or more")
    ]),
    password: z.string()
});

module.exports = { createUserSchema, updateUserSchema, loginUserSchema };
