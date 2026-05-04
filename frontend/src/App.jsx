import { Routes, Route, Navigate } from "react-router-dom"
import ProtectedRoute from "./context/ProtectedRoute"
import Login from "./Component/Login"
import './App.css'
import Dashboard from "./Component/Dashboard"
import Categories from "./Component/Categories"
import Suppliers from "./Component/Suppliers"

function App() {
  return (
    <Routes>

      {/* redirect หน้าแรกไป login */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* public route */}
      <Route path="/login" element={<Login/>} />

      {/* admin routes */}
      <Route
        path="/admin-dashboard"
        element={
          <ProtectedRoute role={"admin"}>
            <Dashboard/>
           </ProtectedRoute>
        }
      >
<Route
index
element={<h1>Sumary of dashboard</h1>}
/>
<Route path="categories"
element={<Categories/>}
/>
<Route path="products"
element={<h1>Product</h1>}
/>
<Route path="suppliers"
element={<Suppliers/>}
/>
<Route path="orders"
element={<h1>Orders</h1>}
/>
<Route path="users"
element={<h1>Users</h1>}
/>
<Route path="profile"
element={<h1>Profile</h1>}
/>
</Route>
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