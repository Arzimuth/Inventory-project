const express = require("express")
const router = express.Router()

const  authMiddleware = require("../Middleware/authMiddleware")
const { addOrder, getOrder } = require("../Controller/OrderController")




router.get("/",authMiddleware,getOrder)
router.post("/add",authMiddleware,addOrder)
// router.put("/:id",authMiddleware,updateProduct)
// router.delete("/:id",authMiddleware,deleteProduct)


module.exports= router