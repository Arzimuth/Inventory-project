import { useEffect, useState } from "react"
import { getDashBoard } from "../Functions/DashBoard"


const Summary = () => {

const [dashBoardData,setDashBoardData]=useState({
    totalProducts :0,
    totalStock:0,
    ordersToday :0,
    revenue:0,
    outOfStock :[],
    highestSaleProduct:null,
    lowStock:[]
})

const [loading,setLoading]=useState(true)


useEffect(()=>{
LoadDashBoard()
},[])


const LoadDashBoard = async()=>{
    try{
      
    const res = await getDashBoard()
    console.log(res.data);
    setDashBoardData(res.data.dashBoardData)
    }catch(error){
        console.log(error);
    }finally{
        setLoading(false)
    }
 
 
}

if(loading){
    return <div>Loading ...</div>
}





  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <h2 className="text-3xl font-bold text-gray-100 mb-6">DashBoard</h2>
       
       
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
    <div className="bg-gradient-to-br from-blue-500 via-blue-400 to-blue-600 text-white p-4 rounded-lg shadow-md flex-col items-center justify-center">
       <p className="text-lg font-semibold">Total Product</p>
    <p className="text-2xl font-bold">{dashBoardData.totalProducts}</p> 
    </div>
    <div className="bg-gradient-to-br from-blue-500 via-blue-400 to-blue-600 text-white p-4 rounded-lg shadow-md flex-col items-center justify-center">
       <p className="text-lg font-semibold">Total Stock</p>
    <p className="text-2xl font-bold">{dashBoardData.totalStock}</p> 
    </div>
    <div className="bg-gradient-to-br from-blue-500 via-blue-400 to-blue-600 text-white p-4 rounded-lg shadow-md flex-col items-center justify-center">
       <p className="text-lg font-semibold">Orders Today</p>
    <p className="text-2xl font-bold">{dashBoardData.ordersToday}</p> 
    </div>
    <div className="bg-gradient-to-br from-blue-500 via-blue-400 to-blue-600 text-white p-4 rounded-lg shadow-md flex-col items-center justify-center">
       <p className="text-lg font-semibold">Revenue</p>
    <p className="text-2xl font-bold">฿ {dashBoardData.revenue}</p> 
    </div>
    
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
<div className="bg-white p-4 rounded-lg shadow-md">
    <h3>Out of Stock Products</h3>
{
    dashBoardData.outOfStock.length >0 ?(
        <ul className="space-y-2">
        {
dashBoardData.outOfStock.map((item,index)=>
<li key={index} className="text-gray-600">
{item.name}{""}
<span>({item.categoryId.name})</span>
</li>)
    }
</ul>
    ):(<p className="text-gray-400">No products out of Stock</p>)
}
</div>

<div className="bg-white p-4 rounded-lg shadow-md">
    <h3>Highest Sale Products</h3>
{
    dashBoardData.highestSaleProduct?.name ?(
      <div>
        <p>Name:{dashBoardData.highestSaleProduct.name}</p>
        <p>Category:{dashBoardData.highestSaleProduct.category}</p>
        <p>Total Units Sold:{dashBoardData.highestSaleProduct.totalQuantity}</p>
      </div>
    ):(<p className="text-gray-500">{dashBoardData.highestSaleProduct?.message || 'Loading...'}</p>)
}
</div>
<div className="bg-white p-4 rounded-lg shadow-md">
    <h3>Low Stock Products</h3>
{
    dashBoardData.lowStock.length > 0 ?(
      <ul className="space-y-2">
        {
            dashBoardData.lowStock.map((item,index)=>
                <li key={index} className="text-gray-600">
                    <strong>{item.name}</strong>-{item.stock} left{" "}
                    <span className="text-gray-400">({item.categoryId.name})</span>
                </li>
            )
        }
      </ul>
    ):(<p className="text-gray-500">No low stock products.</p>)
}
</div>
</div>
       

        </div>
  )
}
export default Summary