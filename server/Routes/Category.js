const express = require("express")
const router = express.Router()
const {addCategory, getCategory, updateCategory, deleteCategory}=require("../Controller/CategoryController")
const  authMiddleware = require("../Middleware/authMiddleware")


router.post("/add",authMiddleware,addCategory)
router.get("/",authMiddleware,getCategory)
router.put("/:id",authMiddleware,updateCategory)
router.delete("/:id",authMiddleware,deleteCategory)


module.exports= router