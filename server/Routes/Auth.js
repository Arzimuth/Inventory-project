const express = require("express")
const router = express.Router()


const {register,login, getUsers, addUser, deleteUser, getUserProfile, updateProfile}= require("../Controller/AuthController")
const authMiddleware = require("../Middleware/authMiddleware")

router.post("/register",register)
router.post("/login",login)
router.get("/user",authMiddleware,getUsers)
router.post("/user/add",authMiddleware,addUser)
router.delete("/user/:id",authMiddleware,deleteUser)
router.get("/profile",authMiddleware,getUserProfile)
router.put("/profile",authMiddleware,updateProfile)


module.exports= router