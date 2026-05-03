import { Navigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext";

const ProtectedRoute = ({ children, role }) => {
  const { user } = useAuth();

  // 1. ยังไม่ login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 2. check role (รองรับ string / array)


  if (user.role !== role) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;