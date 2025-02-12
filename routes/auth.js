const express = require("express")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const router = express.Router()
const db = require("../config/db");
const { loginController } = require("../controllers/authController");

require('dotenv').config()



//login
router.post('/login', loginController);

module.exports = router