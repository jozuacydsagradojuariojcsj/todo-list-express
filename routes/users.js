const express = require("express")
const router = express.Router()

const db = require("../config/db")

const authenticateJWT = require("../middleware/jwtverify");
const getUserById = require("../controllers/userController");
const checkAdmin = require("../middleware/verifyadmin");


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
//

// router.get("/",(req, res) => {
//     res.send("User List")
// });

// router.get("/new",(req, res) => {
//     res.send("User New Form")
// });

// router.post("/", (req,res) => {
//     res.send("Create User")
// });

// router.
// route("/:id").
// get((req,res)=>{
//     console.log(req.user.name)
//     res.send(`Get User with ID ${req.params.id}`)
// }).put((req,res)=>{
//     res.send(`Update User with ID ${req.params.id}`)
// }).delete((req,res) => {
//     res.send(`Delete USer with ID ${req.params.id}`)
// });

// const users  = [{name:"Kyle"},{name:"Sally"}]

// router.param("id", (req, res, next, id) => {
//     console.log(id)
//     req.user = users[id]
//     next()
// });



module.exports = router


