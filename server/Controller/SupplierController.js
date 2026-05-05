const Supplier = require("../models/Supplier")

exports.addSupplier = async(req,res)=>{
   try{

const {name , email , phone , address} = req.body

if(!name || !email || !phone || !address){
    return res.status(400).json({
        success :false,
        message:"All fields are required"
    })
}

const existingSupplier = await Supplier.findOne({name})


if(existingSupplier){
    return res.status(400).json({success: false, message:"Supplier already exists"})
}

const newSupplier = new Supplier({
    name,
    email,
    phone,
    address,
    
})

await newSupplier.save()

return res.status(201).json({success:true,message:"Suppiler added successfully"})


}catch(error){
    console.log(error);
    return res.status(500).json({success:false,message:"Server error"})
} 
}


exports.getSupplier=async(req,res)=>{
    try{
const supplier = await Supplier.find()
return res.status(200).json({success:true ,supplier})

    }catch(err){
        console.log(err);
        return res.status(500).json({success:false,message:"Server error in get Supplier"})
    }
}  


exports.updateSupplier = async (req,res)=>{
    try{
const {id}=req.params
const { name , email , phone , address} = req.body

const supplier = await Supplier.findById(id)


if(!supplier){
     return res.status(404).json({
        success: false,
        message: "Supplier not found"
      })
}

 
supplier.name = name || supplier.name
supplier.email = email || supplier.email
supplier.phone = phone || supplier.phone
supplier.address = address || supplier.address

    await supplier.save()

     res.json({
      success: true,
      message: "Supplier updated"
    })

    }catch(err){
        console.log(err);
        return res.status(500).json({success:false,message:"Server error in update Supplier"})
    }
}


exports.deleteSupplier = async(req,res)=>{
    try{
        const {id}=req.params
        const supplier = await Supplier.findByIdAndDelete({_id:id})
        
return res.status(201).json({success:true,message:"Supplier deleted successfully"})

    }catch(err){
console.log(err);
        return res.status(500).json({success:false,message:"Server error in delete Supplier"})
    }
}