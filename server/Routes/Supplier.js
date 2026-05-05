const express = require("express")
const router = express.Router()
const authMiddleware = require("../Middleware/authMiddleware")
const { addSupplier, getSupplier, updateSupplier, deleteSupplier } = require("../Controller/SupplierController")


router.post("/add",authMiddleware,addSupplier)
router.get("/",authMiddleware,getSupplier)
router.put("/:id",authMiddleware,updateSupplier)
router.delete("/:id",authMiddleware,deleteSupplier)


module.exports= router