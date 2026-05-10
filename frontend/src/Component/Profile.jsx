import { useEffect, useState } from "react"
import { getUserProfile, UpdateProfile } from "../Functions/Auth"

const Profile = () => {

const [user,setUser]=useState({
    name:"",
    username:"",
    address:"",
    password:"",
})

const [edit,setEdit]=useState(false)


useEffect(()=>{
LoadUser()
},[])



const LoadUser = async()=>{

    try{
const res = await getUserProfile()

console.log(res.data);

setUser((prev)=>({
    ...prev,name:res.data.user.name,
    username:res.data.user.username,
    password:""
    }))

    }catch(err){
        console.log(err);
    }
}


const handleChange=(e)=>{
    setUser({...user,[e.target.name]:e.target.value})

}

const handleSubmit =async(e)=> {
 e.preventDefault()
    try{

const res = await UpdateProfile(user)

alert("profile updated Successfully")
setEdit(false)

    }catch(err){
        console.log("ERROR:", error)
    
        const msg = error.response?.data?.message || "Error Change Password"
        alert(msg)
    }
}

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
       {/* Title */}
      <h1 className="text-3xl font-bold text-gray-100 mb-6">
        Users Management
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Add Category Card */}
        <div className="bg-white rounded-2xl shadow-md p-6">

          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Add User
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>

            {/* Name */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                User's Name
              </label>
              <input
                type="text"
                name="name"
                value={user.name || ""}
                placeholder="Enter User name"
                onChange={handleChange}
                disabled ={!edit}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                transition"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Username
              </label>
              <input
                type="text"
                name="username"
                placeholder="Enter Username"
                value={user.username || ""}
                onChange={handleChange}
                disabled ={!edit}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                transition"
              />
            </div>
           {
           edit && (<div>
              <label className="block text-sm text-gray-600 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter new password (optional)"
                value={user.password || ""}
                onChange={handleChange}
             disabled ={!edit}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                transition"
              />
            </div>)
            
          }
      

            {/* Button */}
            {
                !edit ? ( <button
              type="button"
              onClick={()=>setEdit((prev)=>!prev)}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 rounded-lg 
              hover:bg-blue-600 active:scale-95 transition duration-200 font-medium hover:scale-103 hover:shadow-lg hover:shadow-blue-500/40 "
            >
            Edit
            </button>) :(
                <>
                <button 
                type="submit"
                 className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 rounded-lg 
              hover:bg-blue-600 active:scale-95 transition duration-200 font-medium hover:scale-103 hover:shadow-lg hover:shadow-blue-500/40 "
                >Save Change</button>
                <button 
                 onClick={()=>setEdit((prev)=>!prev)}
                 type="button"
                    className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-2 rounded-lg 
              hover:bg-blue-600 active:scale-95 transition duration-200 font-medium hover:scale-103 hover:shadow-lg hover:shadow-blue-500/40 "
                >Cancel</button>
                </>
            )
            }
            
            
           

          </form>
        </div>
</div>
   </div>
  )
}
export default Profile