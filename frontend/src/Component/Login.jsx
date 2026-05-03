import { useState } from "react"

import { useAuth } from "../context/Authcontext"
import { loginFunction } from "../Functions/Auth"
import { useNavigate } from "react-router-dom"

const Login = () => {

  const [value,setValue]=useState({
    username : "",
    password:""
  })

  const [error,setError] =useState(null)
  const [loading,setLoading]=useState(false)

  const handleChange =(e)=>{
    setValue({...value,[e.target.name]:e.target.value})
  }

const {login} = useAuth()

const navigate = useNavigate()


const handleSubmit = async(e)=>{
e.preventDefault()
setError(null)
setLoading(true)
try{
const res = await loginFunction(value)
console.log(res);

if(res.data.token){
  await login (res.data.user,res.data.token)
  if(res.data.user.role === "admin"){
    navigate("/admin-dashboard")
  }else{
    navigate("/user-dashboard")
  } 

}else{
    alert(res.data.message)
  }


//  setValue({
//             username:"",
//             password:""
//         })

}catch(error){

  setError(error.response.data.message)

}finally {
  setLoading(false)
}
}


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-600 via-white-500 to-slate-800">
      <div className="backdrop-blur-lg bg-white/20 border border-white/30 rounded-2xl p-8 w-full max-w-2xl text-white">
        <h1 className="text-3xl font-bold text-center mb-6 text-white tracking-wide font-mono">Welcome Back</h1>
{
  error && (<div className="bg-red-200 text-red-700 p-2 mb-4 rounded">{error}</div>)
}


<form className="space-y-10" onSubmit={handleSubmit}> 
<div className="relative">
  <input type="text"
  value={value.username} 
  name="username" 
  placeholder=" "
  className="peer w-full px-4 pt-6 pb-2 rounded-lg bg-white/10 border border-white/30 
    focus:outline-none focus:ring-2 focus:ring-white text-white"
    onChange={handleChange}
  required/>
  <label 
  className="absolute left-4 top-3  text-sm font-mono text-white transition-all
  peer-placeholder-shown:top-4 
    peer-placeholder-shown:text-base 
    peer-placeholder-shown:text-white/50

    peer-focus:top-2 
    peer-focus:text-sm 
    peer-focus:text-white
  "
  htmlFor="username">Username </label>
  
</div>
<div className="relative">
   <input
              type="password"
              name="password"
               value={value.password} 
              required
              className="peer w-full px-4 py-3  pt-6 pb-2 rounded-lg bg-white/10 border border-white/30 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-white"
              placeholder=" "
              onChange={handleChange}
            />
            <label className="absolute left-4  top-3 text-sm text-white/70 transition-all 
              peer-placeholder-shown:top-4 
              peer-placeholder-shown:text-base 
              peer-focus:top-2 
              peer-focus:text-sm
              peer-focus:text-white">
              Password
            </label>
</div>
<button className="w-full py-3 rounded-lg bg-white text font-mono text-slate-800 font-bold hover:bg-slate-500 hover:text-white active:scale-95 transition duration-200 shadow-lg" type="submit">
  
{
  loading ? "Loading...": "Login"
}
  </button>
</form>
      </div>

    </div>
  )
}
export default Login