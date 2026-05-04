import { useEffect, useState } from "react";
import { AddCategory, deleteCategory, getCategory, UpdateCategory } from "../Functions/Categories";

const Categories = () => {
 const [value,setValue]=useState({
    categoryName: "",
    categoryDescription:""
  })

  const [categories,setCategories]=useState([])
  const [loading,setLoading]=useState(true)
  const [editCategory,setEditCategory]=useState(null)




  useEffect(()=>{
    LoadCategory()
    
  },[])

const LoadCategory = async()=>{
    setLoading(true)
    try{
        const res= await getCategory()

        console.log(res.data.category);
        setCategories(res.data.category)
        setLoading(false)
    }catch(err){
        console.log(err);
        
    }
    
}



const handleChange =(e)=>{
    setValue({...value,[e.target.name]:e.target.value})
}

const handleSubmit =async(e)=>{
    e.preventDefault()
    try{
let res
if(editCategory){
 res = await UpdateCategory(editCategory, value)
      alert("Category updated successfully")
}else{
    res = await AddCategory(value)
    alert("Category added successfully")
}

LoadCategory()

    setValue({
      categoryName: "",
      categoryDescription: ""
    })

    setEditCategory(null)
        
         
    }catch(error){
        console.log("ERROR:", error)

    const msg = error.response?.data?.message || "Error adding category"
    alert(msg)
    }
}

const handleEdit = async(category)=>{
setEditCategory(category._id)
setValue({
     categoryName: category.categoryName || "",
    categoryDescription:category.categoryDescription || "",
})
}

const handleCancel = async()=>{
    setEditCategory(null)
    setValue(
        {
    categoryName: "",
    categoryDescription:""
  }
    )
}

const handleDelete = async(id)=>{

try{
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    )
if(confirmDelete){

    const res = await deleteCategory(id)
    LoadCategory()
    alert("delete category completed !!!")
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
        Category Management
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Add Category Card */}
        <div className="bg-white rounded-2xl shadow-md p-6">

          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            {editCategory ? "Edit Category":"Add Category"}
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>

            {/* Name */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Category Name
              </label>
              <input
                type="text"
                name="categoryName"
                value={value.categoryName || ""}
                placeholder="Enter category name"
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                transition"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Category Description
              </label>
              <input
                type="text"
                name="categoryDescription"
                placeholder="Enter description"
                value={value.categoryDescription || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                transition"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 rounded-lg 
              hover:bg-blue-600 active:scale-95 transition duration-200 font-medium hover:scale-105 hover:shadow-lg hover:shadow-blue-500/40 "
            >
              {editCategory ? "Save Category": "Add Category"}
            </button>
{
    editCategory && (
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

        {/* Placeholder for Category List */}
        <div className="bg-white rounded-2xl shadow-md p-6 overflow-x-auto">
          
          
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
    Category List
  </h2>
            
           

  <table className="w-full text-sm text-left text-gray-600">

    {/* Header */}
    <thead className="text-xs uppercase bg-gray-100 text-gray-700">
      <tr>
        <th className="px-4 py-3">No.</th>
        <th className="px-4 py-3">Category Name</th>
        <th className="px-4 py-3">Description</th>
        <th className="px-4 py-3 text-center">Actions</th>
      </tr>
    </thead>

    {/* Body */}
    <tbody>
      {categories.length > 0 ? (
        categories.map((item, index) => (
          <tr
            key={item._id || index}
            className="border-b hover:bg-gray-50 transition"
          >
            {/* Index */}
            <td className="px-4 py-3 font-medium">
              {index + 1}
            </td>

            {/* Name */}
            <td className="px-4 py-3 font-semibold text-gray-800">
              {item.categoryName}
            </td>

            {/* Description */}
            <td className="px-4 py-3">
              {item.categoryDescription}
            </td>

            {/* Actions */}
            <td className="px-4 py-3 text-center space-x-2">

              <button
              onClick={()=>handleEdit(item)}
               className="px-3 py-1 text-xs rounded-lg bg-gradient-to-r from-yellow-300 to-yellow-400 text-white hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/40 transition">
                Edit
              </button>

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

export default Categories;