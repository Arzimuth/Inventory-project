import { useEffect } from "react"
import { useAuth } from "../context/Authcontext"
import { useNavigate } from "react-router-dom"

const Root = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate("/login")
      return
    }

    if (user.role === "admin") {
      navigate("/admin/dashboard")
    } else if (user.role === "user") {
      navigate("/user/dashboard")
    } else {
      navigate("/login")
    }
  }, [user, navigate])

  return null
}

export default Root