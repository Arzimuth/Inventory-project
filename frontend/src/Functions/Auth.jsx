import axios from "axios"



export const loginFunction = async(value)=>
    await axios.post("http://localhost:5000/api/login",value)