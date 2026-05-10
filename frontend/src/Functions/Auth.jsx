import axios from "axios"



export const loginFunction = async(value)=>
    await axios.post("http://localhost:5000/api/login",value)



export const getUser =async ()=>{
    const token = localStorage.getItem("token")
    return  axios.get("http://localhost:5000/api/user",{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
}

export const AddUser = async (value) => {
  const token = localStorage.getItem("token")

  return axios.post(
    "http://localhost:5000/api/user/add",
    value,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
}


     export const deleteUser = async (id) =>{
     const token = localStorage.getItem("token")
     return  axios.delete(`http://localhost:5000/api/user/${id}`,
{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

     )}


     
export const getUserProfile =async ()=>{
    const token = localStorage.getItem("token")
    return  axios.get("http://localhost:5000/api/profile",{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
}


export const UpdateProfile = async (value) =>{
     const token = localStorage.getItem("token")
     return  axios.put(`http://localhost:5000/api/profile`, value,
{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

     )}
