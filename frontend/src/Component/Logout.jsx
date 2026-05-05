import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/Authcontext"

const Logout = () => {
    const {logout}= useAuth()
    const navigate = useNavigate()
logout()
navigate("/login")

//   return (
//     <div>Logout</div>
//   )
}
export default Logout