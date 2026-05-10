import axios from "axios"




export const getDashBoard =async ()=>{
    const token = localStorage.getItem("token")
    return  axios.get("http://localhost:5000/api/dashboard",{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
}
