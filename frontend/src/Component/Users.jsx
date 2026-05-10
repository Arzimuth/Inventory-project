
import { useEffect, useState } from "react";
import { AddUser, deleteUser, getUser } from "../Functions/Auth";

const Users = () => {
const [formData,setFormData]=useState({
    name:"",
    username:"",
    password : "",
    address:"",
    role: "",
  })

  const [users,setUsers]=useState([])
  const [loading,setLoading]=useState(true)
//   const [editCategory,setEditCategory]=useState(null)




  useEffect(()=>{
    LoadUsers()
    
  },[])

const LoadUsers = async()=>{
    setLoading(true)
    try{
        const res= await getUser()

        console.log(res.data);
        setUsers(res.data.user)
        setLoading(false)
    }catch(err){
        console.log(err);
        
    }
    
}



const handleChange =(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
}

const handleSubmit =async(e)=>{
    e.preventDefault()
    try{
let res = await AddUser(formData)
//     alert("User added successfully")
// if(editCategory){
//  res = await UpdateCategory(editCategory, value)
//       alert("Category updated successfully")
// }else{
//     res = await AddUser(formData)
    alert("User added successfully")
// }

LoadUsers()

    setFormData({
        name:"",
    username:"",
    password : "",
    address:"",
    role: "",
    })

        
         
    }catch(error){
        console.log("ERROR:", error)

    const msg = error.response?.data?.message || "Error adding User"
    alert(msg)
    }
}



const handleDelete = async(id)=>{

try{
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this User ?"
    )
if(confirmDelete){

    const res = await deleteUser(id)
    LoadUsers()
    alert("delete user completed !!!")
}else{
    alert(res.data.message || "Delete failed")
}

}
catch(err){
    console.log(err);
    const msg = err.response?.data?.message || "Delete failed"
    alert(msg)
}

}



if(loading) return <div>Loading...</div>
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
                value={formData.name || ""}
                placeholder="Enter User name"
                onChange={handleChange}
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
                value={formData.username || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                transition"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                value={formData.password || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                transition"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Address
              </label>
              <input
                type="text"
                name="address"
                placeholder="Enter Address"
                value={formData.address|| ""}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                transition"
              />
            </div>
             <div className="flex flex-col gap-2">
                <label className="block text-sm text-gray-600 mb-1">
               Role
              </label>
    <select
      name="role"
      className="text-gray-500  border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
   onChange={handleChange}
    value={formData.role}
   >
      <option value="">Select Role</option>
      <option value="admin">Admin</option>
      <option value="user">User</option>

    </select>
  </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 rounded-lg 
              hover:bg-blue-600 active:scale-95 transition duration-200 font-medium hover:scale-103 hover:shadow-lg hover:shadow-blue-500/40 "
            >
            Add User
            </button>

          </form>
        </div>

        {/* Placeholder for Category List */}
        <div className="bg-white rounded-2xl shadow-md p-6 overflow-x-auto">
          
          
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
    User List
  </h2>
            
           

  <table className="w-full text-sm text-left text-gray-600">

    {/* Header */}
    <thead className="text-xs uppercase bg-gray-100 text-gray-700">
      <tr>
        <th className="px-4 py-3">No.</th>
        <th className="px-4 py-3">Name</th>
        <th className="px-4 py-3">UserName</th>
        <th className="px-4 py-3">Address</th>
        <th className="px-4 py-3">Role</th>
        <th className="px-4 py-3 text-center">Action</th>
      </tr>
    </thead>

    {/* Body */}
    <tbody>
      {users.length > 0 ? (
       users.map((item, index) => (
          <tr
            key={item._id || index}
            className="border-b hover:bg-gray-50 transition"
          >
            {/* Index */}
            <td className="px-4 py-3 font-medium">
              {index + 1}
            </td>

           
            <td className="px-4 py-3 font-semibold text-gray-800">
              {item.name}
            </td>

            <td className="px-4 py-3">
              {item.username}
            </td>

            <td className="px-4 py-3">
              {item.address}
            </td>

            <td className="px-4 py-3">
              {item.role}
            </td>

            {/* Actions */}
            <td className="px-4 py-3 text-center space-x-2 ">

              {/* <button
              onClick={()=>handleEdit(item)}
               className="px-3 py-1 text-xs rounded-lg bg-gradient-to-r from-yellow-300 to-yellow-400 text-white hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/40 transition">
                Edit
              </button> */}

              <button 
              onClick={()=>handleDelete(item._id)}
              className="px-3 py-1 text-xs rounded-lg bg-gradient-to-r from-red-600 to-red-700 text-white hover:scale-105 hover:shadow-lg hover:shadow-red-500/40 transition">
                Delete
              </button>

            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="4" className="text-center py-6 text-gray-400">
            No categories found
          </td>
        </tr>
      )}
    </tbody>

  </table>
        </div>

      </div>
    </div>
  );
};

export default Users