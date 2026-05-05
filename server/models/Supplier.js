const mongoose =require('mongoose')

const supplierSchema = new mongoose.Schema ({
    name:{type:String,required:true},
    email:{type:String,required:true},
    phone:{type:Number,required:true},
    address:{type:String,required:true},
    createAt:{type:Date,default:Date.now},
})

module.exports = Supplier = mongoose.model("Supplier",supplierSchema)