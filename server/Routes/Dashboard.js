const express = require("express")
const router = express.Router()

const  authMiddleware = require("../Middleware/authMiddleware")
const { getData } = require("../Controller/DashBoardController")


router.get("/",authMiddleware,getData)



module.exports= router