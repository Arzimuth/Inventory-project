const bcrypt = require('bcrypt')
const User = require("../models/User")
const jwt = require("jsonwebtoken")


exports.register = async (req,res)=>{
    try{
        const{name,username,password}=req.body
        let user = await User.findOne({username})
        if(!username){
            return res.status(400).json({message:"Username is required"})
        }
        if(!password){
    return res.status(400).json({message:"Password is required"})
}
if(user){
    return res.status(400).json({message:"Username already used"})
}

const salt = await bcrypt.genSalt(10)
user = new User ({name,username,password})

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
        const user = await User.findOneAndUpdate({username})
        if(!username){
            return res.status(400).json({message:"Username is require"})
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