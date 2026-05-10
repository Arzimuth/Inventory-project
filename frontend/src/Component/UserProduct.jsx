import { useEffect, useState } from "react"
import { getCategory } from "../Functions/Categories"
import { getProduct } from "../Functions/Product"
import { AddOrder } from "../Functions/Order"

const UserProduct = () => {
    const [categories,setCategories] = useState([])
    const [products,setProducts]=useState([])
    const [filteredProduct,setFilteredProduct]=useState([])
    const [load,setLoading]=useState(false)
    const [searchTerm,setSearchTerm]=useState("")
    const [openModal,setOpenModal]=useState(false)
    const [orderData,setOrderData]=useState({
       productId : "",
       quantity :1 ,
       total :0,
       stock:0,
       price:0
    })



  useEffect(()=>{
    LoadData()
    
  },[])

const LoadData = async()=>{
    setLoading(true)
    try{
        const res= await getProduct()

        console.log(res.data.product);
        setCategories(res.data.category)
        setProducts(res.data.product)
        setFilteredProduct(res.data.product)
        setLoading(false)
    }catch(err){
        console.log(err);
        
    }
    
}


const handleSearch = (e)=>{
const value = e.target.value
  setSearchTerm(value)
  const filtered = products.filter((item) =>
    item.name.toLowerCase().includes(value.toLowerCase()) ||
    item.categoryId.categoryName.toLowerCase().includes(value.toLowerCase()) 
)
    setFilteredProduct(filtered)
}


const handleSearchCategory = (e)=>{
const value = e.target.value
  setSearchTerm(value)
  const filtered = products.filter((item) =>
item.categoryId.categoryName === value
)

if(value === "all Product"){
    setFilteredProduct(products)
}else{
    setFilteredProduct(filtered)
}

    
}


const handleSubmit = async(e)=>{
    e.preventDefault()
   
        try{
    
     const res = await AddOrder(orderData)

    
    LoadData()
    
        setOrderData({
        productId : "",
       quantity :1 ,
       total :0,
       stock:0,
       price:0
        })
        setOpenModal(false)
    
      alert("order added success")
            
             
        }catch(error){
            console.log("ERROR:", error)
    
        const msg = error.response?.data?.message || "Error adding Order"
        alert(msg)
        }
}


const handleOrderChange =(product)=>{
setOrderData({
    productId:product._id,
    quantity:1,
    total :product.price,
    stock :product.stock,
    price :product.price
})
setOpenModal(true)
}

const closeModal=()=>{
    setOpenModal(false)
}

const IncreaseQuantity =(e)=>{
  const qty =Number(e.target.value)
    if(qty> orderData.stock){
        alert("Not enought stock")
    }else{
        setOrderData({...orderData,quantity:parseInt(e.target.value),
            total : parseInt(e.target.value)* parseInt(orderData.price)
        })
    }
}


  return (
   <div className="p-6 min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
    
    <div className="mb-6 ">
        <h1 className="text-3xl font-bold text-gray-100 mb-6">
            User Products
        </h1>
    </div>

    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between py-5">
        
        <div>
            <select
             onChange={handleSearchCategory}
                className="rounded-xl border border-slate-700 bg-slate-800 px-5 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500"
            >
                <option value="all Product">Select Product</option>
                {
                    categories.map((item)=>
                    <option value={item.name} key={item._id} >{item.categoryName}</option>
                    )
                }
            </select>
        </div>

        <div className="w-full md:w-80">
            <input
                type="text"
                placeholder="Search"
               onChange={handleSearch}
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder-slate-400 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500"
            />
        </div>



    </div>
     <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden ">
        <thead className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-center">
          <tr>
            <th className="py-3 px-6 text-left">Product Name</th>
            <th className="py-3 px-6 text-left">Category Name</th>
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
              onClick={()=>handleOrderChange(item)}
               className="px-10 py-2 text-xs rounded-lg bg-gradient-to-r from-green-300 to-green-400 text-white hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/40 transition">
               Order
              </button>

</div>
              
            </td>
            </tr>
          ))}
        </tbody>
      </table>
      {filteredProduct.length ===0 && <div className="text-white">Not Found</div>}
    </div>



{
          openModal &&(
            <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
             
              <div className="w-full max-w-3xl  bg-gray-900/80 backdrop-blur-xl border border-gray-700 rounded-2xl p-5 shadow-2xl animate-[fadeIn_.2s_ease-in-out]">
           
      <button
              onClick={closeModal}
              className="absolute top-4 right-5 text-gray-400 hover:text-white transition text-3xl"
            >
              ✕
            </button>

                <h1 className="text-2xl font-semibold mb-6 text-center text-white">Place Order</h1>
                 
                <form className="flex flex-col gap-4" onSubmit={handleSubmit} >
                  
            
                  <input type="number"
                  name="quantity"
                
                  value={orderData.quantity}
                  onChange={IncreaseQuantity}
                placeholder="Increase Quantity"
                min="1"
                className="bg-gray-800/70 border border-gray-700 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-white"/> 
                  
                  <p className="text-white">{orderData.quantity * orderData.price}</p>

                  <div className="flex gap-4">
                <button
           
                  type="submit"
                className="mt-2 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:shadow-lg hover:shadow-blue-500/40 hover:scale-105 transition-all text-white w-[50%] font-medium"
                  >
                   Place Order
                  </button>

                   <button
            
              className="w-[50%] bg-gradient-to-r from-red-600 to-red-700 hover:scale-105 hover:shadow-lg hover:shadow-red-500/40  text-white py-3 mt-2 rounded-xl
              active:scale-95 transition duration-200 font-medium"
             onClick={closeModal}
            >
              Cancel
            </button>

</div>
                 
                </form> 
                
              </div>
            </div>
          )
        }

</div>
  )
}
export default UserProduct