import axios from "axios"



export const AddOrder = async (value) => {
  const token = localStorage.getItem("token")

  return axios.post(
    "http://localhost:5000/api/order/add",
    value,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
}


export const getOrder =async ()=>{
    const token = localStorage.getItem("token")
    return  axios.get("http://localhost:5000/api/order/",{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
}