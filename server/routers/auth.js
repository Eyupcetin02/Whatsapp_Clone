const express = require("express")
const router = express.Router()
const {login , register, getUsers} = require("../functions/auth")





// router.post("/register" , register)
router.post("/login" , login)
router.get("/getusers" , getUsers)



module.exports = router