const bcrypt = require('bcrypt')
const User = require("../models/User")
const jwt = require("jsonwebtoken")


exports.register = async (req,res)=>{
    try{
        const{name,username,password}=req.body
        if(!username){
            return res.status(400).json({message:"Username is required"})
        }
        if(!password){
    return res.status(400).json({message:"Password is required"})
}
 const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({
        message: "Username already used",
      });
    }

const salt = await bcrypt.genSalt(10)
const user = new User ({name,username,password})

user.password = await bcrypt.hash(password,salt)
await user.save()
res.send("Register Success")



    }catch(err){
        console.log(err);
        
    }
}

exports.login = async (req,res)=>{
    try{
        const {username,password}= req.body
       const user = await User.findOne({username})
        if(!user){
            return res.status(400).json({message:"Username isn't Register"})
        }
        if(!password){
            return res.status(400).json({message:"Password is require"})
        } 
        
        const isMatch = await bcrypt.compare(password,user.password)

        if(!isMatch){
            return res.status(400).json({message:"Password is invalid"})
        }

        const token = jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET,{expiresIn:"1d"})
      return  res.status(200).json({token,user:{id:user.id,name:user.name,username:user.username,role:user.role}})

    }catch(err){
        console.log(err);
        
    }
}


exports.getUsers =async(req,res)=>{
    try{
const user = await User.find()
return res.status(200).json({success:true ,user})

    }catch(err){
        console.log(err);
        return res.status(500).json({success:false,message:"Server error in get Users"})
    }

}


exports.addUser = async(req,res)=>{
   try{

const {  name,username,password,address,role,} = req.body

if(!name || !username || !password || !role){
    return res.status(400).json({
        success :false,
        message:"All fields are required"
    })
}

const existingUser = await User.findOne({username})


if(existingUser){
    return res.status(400).json({success: false, message:"User already exists"})
}

 const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

const newUser = new User({
   name,username,
   password : hashedPassword
   ,address,role,
})

await newUser.save()

return res.status(201).json({success:true,message:"User added successfully"})


}catch(error){
    console.log(error);
    return res.status(500).json({success:false,message:"Server error"})
} 
}



exports.deleteUser = async(req,res)=>{
     try{
         const {id}=req.params
         const user = await User.findByIdAndDelete({_id:id})
         
 return res.status(201).json({success:true,message:"User deleted successfully"})
 
     }catch(err){
 console.log(err);
         return res.status(500).json({success:false,message:"Server error in delete User"})
     }
}



exports.getUserProfile =async(req,res)=>{
    try{
        const userId = req.user._id

const user = await User.findById(userId).select('-password')

if(!user){
    return res.status(404).json({success:true,user})
}

return res.status(200).json({success:true ,user})




    }catch(err){
        console.log(err);
        return res.status(500).json({success:false,message:"Server error in get UsersProfile"})
    }

}


exports.updateProfile =async(req,res)=>{
    try{
const userId = req.user._id
const {name,username,password} =req.body

const updateData = {name,username}

if(password && password.trim() !== ''){
    const hashedPassword = await bcrypt.hash(password,10)
    updateData.password = hashedPassword
}

const user = await User.findByIdAndUpdate(userId,updateData,{new:true}).select("-password")
if(!user){
    return res.status(404).json({success:false})
}




return res.status(200).json({success:true ,message:"Profile updated Sucessfully",user})


    }catch(err){
         console.log(err);
        return res.status(500).json({success:false,message:"Server error in update UsersProfile"})
    }
}