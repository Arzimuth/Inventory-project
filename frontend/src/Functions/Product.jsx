import axios from "axios"





export const getProduct =async ()=>{
    const token = localStorage.getItem("token")
    return  axios.get("http://localhost:5000/api/product/",{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
}


export const AddProduct = async (value) => {
  const token = localStorage.getItem("token")

  return axios.post(
    "http://localhost:5000/api/product/add",
    value,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
}


export const UpdateProduct = async (id, value) =>{
     const token = localStorage.getItem("token")
     return  axios.put(`http://localhost:5000/api/product/${id}`, value,
{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

     )}


     
     export const deleteProduct = async (id) =>{
     const token = localStorage.getItem("token")
     return  axios.delete(`http://localhost:5000/api/product/${id}`,
{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

     )}
