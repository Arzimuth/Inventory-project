import axios from "axios"


export const AddSupplier = async (value) => {
  const token = localStorage.getItem("token")

  return axios.post(
    "http://localhost:5000/api/supplier/add",
    value,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
}


export const getSupplier =async ()=>{
    const token = localStorage.getItem("token")
    return  axios.get("http://localhost:5000/api/supplier/",{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
}


export const UpdateSupplier = async (id, value) =>{
     const token = localStorage.getItem("token")
     return  axios.put(`http://localhost:5000/api/supplier/${id}`, value,
{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

     )}


     
     export const deleteSupplier = async (id) =>{
     const token = localStorage.getItem("token")
     return  axios.delete(`http://localhost:5000/api/supplier/${id}`,
{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

     )}