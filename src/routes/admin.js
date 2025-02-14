const express = require("express")
const router = express.Router()

const authenticateJWT = require("../middleware/jwtverify");
const checkAdmin = require("../middleware/verifyadmin");

const { adminCreateUser, adminGetUser, adminPatchUser, adminDeleteUser } = require("../controllers/adminController");
const { createUserValidation, updateUserValidation } = require("../middleware/validationMiddleware");
const { createUserSchema, updateUserSchema } = require("../../schemas/userSchema");

router.
route("/user/:id")
.delete(authenticateJWT, checkAdmin, adminDeleteUser)
.get(authenticateJWT,checkAdmin, adminGetUser)
.patch(authenticateJWT,checkAdmin, updateUserValidation(updateUserSchema),adminPatchUser);

router.post(("/user/create"),authenticateJWT,checkAdmin,createUserValidation(createUserSchema),adminCreateUser);


module.exports = router 