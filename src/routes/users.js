const express = require("express")
const router = express.Router()

const authenticateJWT = require("../middleware/jwtverify");
const getUserById = require("../controllers/userController");

router.
route("/:id").
get(authenticateJWT,getUserById);

//giusa sa isa ka file, so buhaton ug proper folder structuring 
//config = setup database and configs
//controllers = ang code sa route ibutnag ug functions sa controllers
//models = models ang mga query mu transact sa database, tawagon si config.js import si config ipasa sa controllers ang result
//routes = routes lang
//uploads = images


//role based authentication
//si admin ra maka create ug user

module.exports = router


