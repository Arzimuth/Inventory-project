const Category = require("../models/Category")
const Product = require("../models/Product")

exports.addCategory = async(req,res)=>{
   try{

const {categoryName,categoryDescription} = req.body

if(!categoryName || !categoryDescription){
    return res.status(400).json({
        success :false,
        message:"All fields are required"
    })
}

const existingCategory = await Category.findOne({categoryName})


if(existingCategory){
    return res.status(400).json({success: false, message:"Category already exists"})
}

const newCategory = new Category({
    categoryName,
    categoryDescription,
    
})

await newCategory.save()

return res.status(201).json({success:true,message:"Category added successfully"})


}catch(error){
    console.log(error);
    return res.status(500).json({success:false,message:"Server error"})
} 
}


exports.getCategory =async(req,res)=>{
    try{
const category = await Category.find()
return res.status(200).json({success:true ,category})

    }catch(err){
        console.log(err);
        return res.status(500).json({success:false,message:"Server error in get Category"})
    }

}


exports.updateCategory = async (req,res)=>{
    try{
const {id}=req.params
const { categoryName, categoryDescription } = req.body

const category = await Category.findById(id)


if(!category){
     return res.status(404).json({
        success: false,
        message: "Category not found"
      })
}

 category.categoryName = categoryName || category.categoryName
    category.categoryDescription = categoryDescription || category.categoryDescription

    await category.save()

     res.json({
      success: true,
      message: "Category updated"
    })

    }catch(err){
        console.log(err);
        return res.status(500).json({success:false,message:"Server error in update Category"})
    }
}


exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params

    const category = await Category.findById(id)

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found"
      })
    }

    const productCount = await Product.countDocuments({ categoryId: id })

    if (productCount > 0) {
      return res.status(400).json({
        success: false,
        message: "Cannot delete category because it has products"
      })
    }

    await Category.findByIdAndDelete(id)

    return res.status(200).json({
      success: true,
      message: "Category deleted successfully"
    })

  } catch (err) {
    console.log(err)
    return res.status(500).json({
      success: false,
      message: "Server error in delete Category"
    })
  }
}