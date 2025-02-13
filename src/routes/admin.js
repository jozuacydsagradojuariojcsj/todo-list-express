const express = require("express")
const router = express.Router()

const authenticateJWT = require("../middleware/jwtverify");
const checkAdmin = require("../middleware/verifyadmin");

const { adminCreateUser, adminGetUser, adminPatchUser, adminDeleteUser } = require("../controllers/adminController");

router.
route("/user/:id")
.delete(authenticateJWT, checkAdmin, adminDeleteUser)
.get(authenticateJWT,checkAdmin, adminGetUser)
.patch(authenticateJWT,checkAdmin, adminPatchUser);

router.post(("/user/create"),authenticateJWT,checkAdmin,adminCreateUser);


module.exports = router 