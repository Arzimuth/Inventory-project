import { useState } from "react"

const Suppliers = () => {

const [addEditModal,setAddEditModal]=useState(null)
const [formData,setFormData]=useState ({
  name:"",
  email:"",
  phone:"",
  address:"",
})


const handleChange =(e)=>{
setFormData({...formData,[e.target.name]:e.target.value})
console.log(formData);

}

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6">
        
        <h1 className="text-3xl font-bold mb-6 tracking-wide">Supplier Management</h1>
        
        <div className="flex justify-between items-center mb-6">
            <input type="text" placeholder="Search supplier" className="bg-gray-500 backdrop-blur-md border border-gray-700 px-4 py-2 rounded-xl w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"/>
            <button
            onClick={()=>setAddEditModal(1)}
             className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/30 transition-all">Add Supplier</button>
        </div>
        {
          addEditModal &&(
            <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
             
              <div className="w-full max-w-3xl  bg-gray-900/80 backdrop-blur-xl border border-gray-700 rounded-2xl p-5 shadow-2xl animate-[fadeIn_.2s_ease-in-out]">
           
            <button
              onClick={() => setAddEditModal(null)}
              className="absolute top-4 right-5 text-gray-400 hover:text-white transition text-3xl"
            >
              ✕
            </button>

                <h1 className="text-2xl font-semibold mb-6 text-center">Add Supplier</h1>
                 
                <form className="flex flex-col gap-4">
                  
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
                  >Add Supplier</button>
                </form>
              </div>
            </div>
          )
        }
    </div>
  )
}
export default Suppliers