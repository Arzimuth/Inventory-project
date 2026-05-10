import { useEffect, useState } from "react"
import { getOrder } from "../Functions/Order"


const Order = () => {

const[orders,setOrders]=useState([])
const[loading,setLoading]=useState(false)

useEffect(()=>{

LoadOrder()

},[])


const LoadOrder =async()=>{
 setLoading(true)
    try{
        const res= await getOrder()

        console.log(res.data.order);
    setOrders(res.data.order)
        setLoading(false)
    }catch(err){
        console.log(err);
        
    }

}


  return (
     <div className="p-6 min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
       <div className="mb-6 ">
        <h1 className="text-3xl font-bold text-gray-100 mb-6">
            Orders
        </h1>
    </div>
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden ">
        <thead className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-center">
          <tr>
            <th className="py-3 px-6 text-left">No</th>
            <th className="py-3 px-6 text-left">Product Name</th>
            <th className="py-3 px-6 text-left">Category Name</th>
            <th className="py-3 px-6 text-left">Quantity</th>
            <th className="py-3 px-6 text-left">Total Price</th>
            <th className="py-3 px-6 text-center">Date</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {orders.map((item, index) => (
            <tr
              key={item._id}
              className={`border-b hover:bg-gray-100 transition duration-200 ${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              }`}
            >
                <td className="py-3 px-6">{index+1}</td>
              <td className="py-3 px-6">{item.product.name}</td>
              <td className="py-3 px-6">{item.product.categoryId.categoryName}</td>
              <td className="py-3 px-6">{item.quantity}</td>
              <td className="py-3 px-6">{item.totalPrice}</td>

              <td className="py-3 px-6 text-center">

              {new Date(item.orderDate).toLocaleDateString()}
            </td>
            </tr>
          ))}
        </tbody>
      </table>
      {orders.length ===0 && <div className="text-white">Not Found</div>}
    </div>
        </div>
  )
}
export default Order