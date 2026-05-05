import { useEffect, useState } from "react"
import { AddProduct, deleteProduct, getProduct, UpdateProduct } from "../Functions/Product"


const Products = () => {

const [openModal,setOpenModal]=useState(false)
const [categories,setCategories]=useState([])
const [supplier,setSupplier]=useState([])
const [loading,setLoading]=useState(true)
const [products,setProducts]=useState([])
const [editProduct,setEditProduct]=useState(false)
const [filteredProduct,setFilteredProduct] =useState([])
const [searchTerm,setSearchTerm] =useState("")

const [formData,setFormData]=useState({
    name:"",
description :"",
price:"",
stock:"",
categoryId :"",
supplierId :"",



})


useEffect(()=>{

    LoadData()

},[])


const LoadData = async () => {
  setLoading(true)
  try {
    const res = await getProduct()
   console.log(res.data);
   
    setSupplier(res.data.supplier)
    setCategories(res.data.category)
    setProducts(res.data.product)
    setFilteredProduct(res.data.product)

    
  } catch (err) {
     console.log("ERROR:", error)

    const msg = error.response?.data?.message || "Error adding Supplier"
    alert(msg)
  } finally {
    setLoading(false)
  }
}




const handleChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})

}

const handleSubmit =async(e)=>{
    e.preventDefault()
    try{
let res 
if(editProduct){
 res = await UpdateProduct(editProduct, formData)
      alert("Product updated successfully")
}else{
    res = await AddProduct(formData)
    alert("Product added successfully")
}



LoadData()

    setFormData({
      name:"",
description :"",
price:"",
stock:"",
categoryId :"",
supplierId :"",
    })

setEditProduct(false)
    setOpenModal(false)

  
        
         
    }catch(error){
        console.log("ERROR:", error)

    const msg = error.response?.data?.message || "Error adding Supplier"
    alert(msg)
    }
}


const handleCancel = async()=>{
    setOpenModal(false)
    setEditProduct(false)
    setFormData({
            name:"",
description :"",
price:"",
stock:"",
categoryId :"",
supplierId :"",


    })

}


const handleEdit = async(product)=>{
 setEditProduct(product._id)
setOpenModal(true)
setFormData({
         name:product.name || "",
  description:product.description || "",
price:product.price || "",
stock:product.stock || "",
categoryId : product.categoryId._id || "",
supplierId :product.supplierId._id || "",
})
}


const handleDelete = async(id)=>{

try{
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this Product ?"
    )
if(confirmDelete){

    const res = await deleteProduct(id)
    LoadData()
    alert("delete Product completed !!!")
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
  const filtered = products.filter((item) =>
    item.name.toLowerCase().includes(value.toLowerCase()) ||
    item.description.toLowerCase().includes(value.toLowerCase())||
    item.categoryId.categoryName.toLowerCase().includes(value.toLowerCase()) ||
    item.supplierId.name.toLowerCase().includes(value.toLowerCase())
)
    setFilteredProduct(filtered)
}


  return (
      <div className="w-full h-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6">
        
        <h1 className="text-3xl font-bold mb-6 tracking-wide">Product Management</h1>
        
        <div className="flex justify-between items-center mb-6">
            <input
           onChange={handleSearch}
            type="text" placeholder="Search Product" className="bg-gray-500 backdrop-blur-md border border-gray-700 px-4 py-2 rounded-xl  focus:outline-none focus:ring-2 focus:ring-blue-500 transition w-64 "/>
            <button
           onClick={()=>setOpenModal(true)}
             className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/30 transition-all">
              Add Product</button>
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
            <th className="py-3 px-6 text-left">Product Name</th>
            <th className="py-3 px-6 text-left">Category Name</th>
            <th className="py-3 px-6 text-left">Suppiler Name</th>
            <th className="py-3 px-6 text-left">Description</th>
            <th className="py-3 px-6 text-left">Price</th>
            <th className="py-3 px-6 text-center">Stock</th>
            <th className="py-3 px-6 text-center">Action</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {filteredProduct.map((item, index) => (
            <tr
              key={item._id}
              className={`border-b hover:bg-gray-100 transition duration-200 ${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              }`}
            >
              <td className="py-3 px-6">{item.name}</td>
              <td className="py-3 px-6">{item.categoryId.categoryName}</td>
              <td className="py-3 px-6">{item.supplierId.name}</td>
              <td className="py-3 px-6">{item.description}</td>
              <td className="py-3 px-6">{item.price}</td>

             <td className="py-3 px-6 text-center">
  <span className="px-2 py-1">
    {item.stock === 0 ? (
      <span className="inline-block min-w-10 rounded-full bg-red-100 text-red-500 text-center">
        {item.stock}
      </span>
    ) : item.stock < 5 ? (
      <span className="inline-block min-w-10 rounded-full bg-yellow-100 text-yellow-600 text-center">
        {item.stock}
      </span>
    ) : (
      <span className="inline-block min-w-10 rounded-full bg-green-100 text-green-600 text-center">
        {item.stock}
      </span>
    )}
  </span>
</td>
              
              
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
      {filteredProduct.length ===0 && <div>Not Found</div>}
    </div>
  )
}
       
       
       
       
        {
          openModal &&(
            <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
             
              <div className="w-full max-w-3xl  bg-gray-900/80 backdrop-blur-xl border border-gray-700 rounded-2xl p-5 shadow-2xl animate-[fadeIn_.2s_ease-in-out]">
           
            <button
              onClick={handleCancel}
              className="absolute top-4 right-5 text-gray-400 hover:text-white transition text-3xl"
            >
              ✕
            </button>

                <h1 className="text-2xl font-semibold mb-6 text-center">Add Supplier</h1>
                 
                <form className="flex flex-col gap-4" onSubmit={handleSubmit} >
                  
                  <input  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                placeholder="Enter Product Name"
                className="bg-gray-800/70 border border-gray-700 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"/>
                  
                  <input type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                placeholder="Description"
                className="bg-gray-800/70 border border-gray-700 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"/> 
                  
                  <input type="number"
                  name="price"
                  min={0}
                  value={formData.price}
                  onChange={handleChange}
                placeholder="Enter Price"
                className="bg-gray-800/70 border border-gray-700 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"/> 
                  
                  <input type="number"
                  name="stock"
                  min="0"
                  value={formData.stock}
                  onChange={handleChange}
                placeholder="Enter Stock"
                className="bg-gray-800/70 border border-gray-700 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"/> 
                  

                  <div className="space-y-5">
  
  {/* Category */}
  <div className="flex flex-col gap-2">
    <select
      name="categoryId"
      className="text-gray-400 bg-gray-800/70 border border-gray-700 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
   onChange={handleChange}
    value={formData.categoryId}
   >
      <option value="">Select Category</option>

      {categories &&
        categories.map((item) => (
          <option key={item._id} value={item._id}
          className="text-white"
          >
            {item.categoryName}
          </option>
        ))}
    </select>
  </div>

  {/* Supplier */}
  <div className="flex flex-col gap-2">
    <select
      name="supplierId"
     className="text-gray-400 bg-gray-800/70 border border-gray-700 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
    onChange={handleChange}
    value={formData.supplierId}
    >
      <option value="">Select Supplier</option>

      {supplier &&
        supplier.map((item) => (
          <option  key={item._id} value={item._id}
          className="text-white"
          >
            {item.name}
          </option>
        ))}
    </select>
  </div>

</div>

                  <button
                  type="submit"
                className="mt-2 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:shadow-lg hover:shadow-blue-500/40 hover:scale-105 transition-all"
                  >
                    { editProduct? "Save Category": "Add Category"} 
                  </button>
                  
                  {
    editProduct && (
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
export default Products