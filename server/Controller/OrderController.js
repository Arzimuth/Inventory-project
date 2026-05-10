const Order = require("../models/Order")
const Product = require("../models/Product")

exports.addOrder = async(req,res)=>{
   try{

const { productId , quantity, total } = req.body
const userId = req.user._id
const product = await Product.findById(productId)

if(!product){
    return res.status(400).json({
        success :false,
        message:"Product not found in Order"
    })
}



if(quantity > product.stock){
    return res.status(400).json({success: false, message:"Not enough stock"})
}
    product.stock -= parseInt(quantity)
    await product.save()

    const totalPrice = product.price * quantity

const newOrder = new Order({
    user : userId,
    product : productId,
    quantity,
    totalPrice,

    
})

await newOrder.save()

return res.status(201).json({success:true,message:"Order added successfully"})

}catch(error){
    console.log(error);
    return res.status(500).json({success:false,message:"Server error"})
} 
}



exports.getOrder =async(req,res)=>{
    try{
        const user =req.user
let filter = {}

if (user.role !== "admin"){
    filter.user = user._id
}

const order = await Order.find(filter).populate({path:"product", populate:{
    path:"categoryId",
    select:"categoryName"
},select:"name price"}).populate('user','name user')
return res.status(200).json({success:true ,order})

    }catch(err){
        console.log(err);
        return res.status(500).json({success:false,message:"Server error in get Order"})
    }

}
