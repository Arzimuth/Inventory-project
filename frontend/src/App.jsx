import { Routes, Route, Navigate } from "react-router-dom"
import ProtectedRoute from "./context/ProtectedRoute"
import Login from "./Component/Login"
import './App.css'

function App() {
  return (
    <Routes>

      {/* redirect หน้าแรกไป login */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* public route */}
      <Route path="/login" element={<Login/>} />

      {/* admin routes */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute role={"admin"}>
            <h1>admin dashboard</h1>
           </ProtectedRoute>
        }
      />

      {/* user routes */}
      <Route
        path="/user/dashboard"
        element={
          <ProtectedRoute role={"user"}>
            <h1>user dashboard</h1>
         </ProtectedRoute>
        }
      />

      {/* fallback */}
      <Route path="*" element={<h1>404 Not Found</h1>} />
      <Route path="/unauthorized" element={<h1>Unauthorized</h1>} />


    </Routes>
  )
}

export default App