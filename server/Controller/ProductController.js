const Supplier = require("../models/Supplier")
const Category = require("../models/Category")
const Product = require("../models/Product")


exports.getProducts=async(req,res)=>{
    try{
const supplier = await Supplier.find()
const category = await Category.find()
const product = await Product.find({isDeleted:false}).populate('categoryId').populate('supplierId')
return res.status(200).json({success:true ,supplier,category,product})

    }catch(err){
        console.log(err);
        return res.status(500).json({success:false,message:"Server error in get data"})
    }
}  


exports.addProduct = async(req,res)=>{
   try{

const { name, description , price, stock, categoryId,supplierId, } = req.body

if(!name || !description || !price || !stock){
    return res.status(400).json({
        success :false,
        message:"All fields are required"
    })
}

const existingProduct = await Product.findOne({name})


if(existingProduct){
    return res.status(400).json({success: false, message:"Product already exists"})
}

const newProducts = new Product({
    name, description , price, stock,categoryId,supplierId,
    
})

await newProducts.save()

return res.status(201).json({success:true,message:"Product added successfully"})


}catch(error){
    console.log(error);
    return res.status(500).json({success:false,message:"Server error"})
} 
}



exports.updateProduct = async (req,res)=>{
    try{
const {id}=req.params
const { name, description , price, stock, categoryId,supplierId,} = req.body

const product = await Product.findById(id)


if(!product){
     return res.status(404).json({
        success: false,
        message: "Product not found"
      })
}

 
product.name = name || product.name
product.description = description  || product.description 
product.price = price || product.price
product.stock= stock || product.stock
product.categoryId= categoryId || product.categoryId
product.supplierId= supplierId || product.supplierId


    await product.save()

     res.json({
      success: true,
      message: "product updated"
    })

    }catch(err){
        console.log(err);
        return res.status(500).json({success:false,message:"Server error in update product"})
    }
}


exports.deleteProduct = async(req,res)=>{
    try{
        const {id}=req.params
        const existingProduct = await Product.findById({_id:id})
        
if(existingProduct.isDeleted){
   
    return res.status(400).json({success:false,message: "Product already deledted"})
}

await Product.findByIdAndDelete(id,{isDeleted:true},{new:true})

return res.status(201).json({success:true,message:"Product deleted successfully"})

    }catch(err){
console.log(err);
        return res.status(500).json({success:false,message:"Server error in delete Product"})
    }
}
