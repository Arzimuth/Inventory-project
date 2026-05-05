const express = require("express")
const router = express.Router()

const  authMiddleware = require("../Middleware/authMiddleware")
const { getProducts, addProduct, updateProduct, deleteProduct } = require("../Controller/ProductController")



router.get("/",authMiddleware,getProducts)
router.post("/add",authMiddleware,addProduct)
router.put("/:id",authMiddleware,updateProduct)
router.delete("/:id",authMiddleware,deleteProduct)


module.exports= router