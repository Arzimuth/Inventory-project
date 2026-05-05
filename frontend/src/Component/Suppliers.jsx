import { useState ,useEffect  } from "react"
import { AddSupplier, deleteSupplier, getSupplier, UpdateSupplier } from "../Functions/Supplier"


const Suppliers = () => {

const [addEditModal,setAddEditModal]=useState(null)
const [formData,setFormData]=useState ({
  name:"",
  email:"",
  phone:"",
  address:"",
})
const [loading,setLoading] =useState(true)
const [suppliers,setSuppliers] =useState([])
const [editSupplier,setEditSupplier] =useState(null)
const [filteredSuppliers,setFilteredSuppliers] =useState([])
const [searchTerm,setSearchTerm] =useState("")
 



  useEffect(()=>{
  LoadSupplier()
    
  },[])



const LoadSupplier = async () => {
  setLoading(true)
  try {
    const res = await getSupplier()
   
    setSuppliers(res.data.supplier)
    setFilteredSuppliers(res.data.supplier)
  } catch (err) {
    console.log(err)
  } finally {
    setLoading(false)
  }
}





const handleChange =(e)=>{
setFormData({...formData,[e.target.name]:e.target.value})


}

const handleSubmit =async(e)=>{
    e.preventDefault()
    try{
let res 
if(editSupplier){
 res = await UpdateSupplier(editSupplier, formData)
      alert("Supplier updated successfully")
}else{
    res = await AddSupplier(formData)
    alert("Supplier added successfully")
}



LoadSupplier()

    setFormData({
       name:"",
  email:"",
  phone:"",
  address:"",
    })

setEditSupplier(null)
    setAddEditModal(false)

  
        
         
    }catch(error){
        console.log("ERROR:", error)

    const msg = error.response?.data?.message || "Error adding Supplier"
    alert(msg)
    }
}

const handleEdit = async(supplier)=>{
  setEditSupplier(supplier._id)
setAddEditModal(true)
setFormData({
         name:supplier.name || "",
  email:supplier.email || "",
  phone:supplier.phone || "",
  address:supplier.address || "",
})
}

const handleCancel = async()=>{
    setAddEditModal(null)
    setEditSupplier(null)
    setFormData(
        {
  name:"",
  email:"",
  phone:"",
  address:"",
  }
    )
}



const handleDelete = async(id)=>{

try{
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    )
if(confirmDelete){

    const res = await deleteSupplier(id)
    LoadSupplier()
    alert("delete Supplier completed !!!")
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

const handleSearch = (e)=>{
const value = e.target.value
  setSearchTerm(value)
  const filtered = suppliers.filter((item) =>
    item.name.toLowerCase().includes(value.toLowerCase()) ||
    item.email.toLowerCase().includes(value.toLowerCase()))
    setFilteredSuppliers(filtered)
}



  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6">
        
        <h1 className="text-3xl font-bold mb-6 tracking-wide">Supplier Management</h1>
        
        <div className="flex justify-between items-center mb-6">
            <input
            
            onChange={handleSearch}
            type="text" placeholder="Search supplier" className="bg-gray-500 backdrop-blur-md border border-gray-700 px-4 py-2 rounded-xl w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"/>
            <button
            onClick={()=>setAddEditModal(true)}
             className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/30 transition-all">
              Add Supplier</button>
        </div>


{
  loading ? (
    <div className="flex justify-center items-center h-40">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  ) : (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden ">
        <thead className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-center">
          <tr>
            <th className="py-3 px-6 text-left">Supplier Name</th>
            <th className="py-3 px-6 text-left">Email</th>
            <th className="py-3 px-6 text-left">Phone Number</th>
            <th className="py-3 px-6 text-left">Address</th>
            <th className="py-3 px-6 text-center">Action</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {filteredSuppliers.map((item, index) => (
            <tr
              key={item._id}
              className={`border-b hover:bg-gray-100 transition duration-200 ${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              }`}
            >
              <td className="py-3 px-6">{item.name}</td>
              <td className="py-3 px-6">{item.email}</td>
              <td className="py-3 px-6">{item.phone}</td>
              <td className="py-3 px-6">{item.address}</td>
              <td className="py-3 px-6 text-center">
<div className="flex justify-center items-center gap-3 w-full">
  <button
              onClick={()=>handleEdit(item)}
               className="px-10 py-2 text-xs rounded-lg bg-gradient-to-r from-yellow-300 to-yellow-400 text-white hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/40 transition">
                Edit
              </button>

              <button 
              onClick={()=>handleDelete(item._id)}
              className="px-10 py-2 text-xs rounded-lg bg-gradient-to-r from-red-600 to-red-700 text-white hover:scale-105 hover:shadow-lg hover:shadow-red-500/40 transition">
                Delete
              </button>
</div>
              

            </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}


        {
          addEditModal &&(
            <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
             
              <div className="w-full max-w-3xl  bg-gray-900/80 backdrop-blur-xl border border-gray-700 rounded-2xl p-5 shadow-2xl animate-[fadeIn_.2s_ease-in-out]">
           
            <button
              onClick={handleCancel}
              className="absolute top-4 right-5 text-gray-400 hover:text-white transition text-3xl"
            >
              ✕
            </button>

                <h1 className="text-2xl font-semibold mb-6 text-center">Add Supplier</h1>
                 
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                  
                  <input  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                placeholder="Supplier Name"
                className="bg-gray-800/70 border border-gray-700 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"/>
                  
                  <input type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                placeholder="Supplier Email"
                className="bg-gray-800/70 border border-gray-700 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"/> 
                  
                  <input type="number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                placeholder="Supplier Phone Number"
                className="bg-gray-800/70 border border-gray-700 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"/> 
                  
                  <input type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                placeholder="Supplier Address"
                className="bg-gray-800/70 border border-gray-700 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"/> 
                  
                  <button
                  type="submit"
                className="mt-2 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:shadow-lg hover:shadow-blue-500/40 hover:scale-105 transition-all"
                  >
                    { editSupplier? "Save Category": "Add Category"}
                  </button>
                  {
    editSupplier && (
        <button
              type="submit"
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:scale-105 hover:shadow-lg hover:shadow-red-500/40  text-white py-2 rounded-lg 
              active:scale-95 transition duration-200 font-medium"
             onClick={handleCancel}
            >
              Cancel
            </button>
    )
    }
                </form>
              </div>
            </div>
          )
        }
    </div>
  )
}
export default Suppliers