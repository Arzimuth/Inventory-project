import axios from "axios"


export const AddCategory = async (value) => {
  const token = localStorage.getItem("token")

  return axios.post(
    "http://localhost:5000/api/category/add",
    value,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
}


export const getCategory =async ()=>{
    const token = localStorage.getItem("token")
    return  axios.get("http://localhost:5000/api/category/",{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
}


export const UpdateCategory = async (id, value) =>{
     const token = localStorage.getItem("token")
     return  axios.put(`http://localhost:5000/api/category/${id}`, value,
{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

     )}


     export const deleteCategory = async (id) =>{
     const token = localStorage.getItem("token")
     return  axios.delete(`http://localhost:5000/api/category/${id}`,
{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

     )}


 