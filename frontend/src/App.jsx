import { Routes, Route, Navigate } from "react-router-dom"
import ProtectedRoute from "./context/ProtectedRoute"
import Login from "./Component/Login"
import './App.css'
import Dashboard from "./Component/Dashboard"
import Categories from "./Component/Categories"
import Suppliers from "./Component/Suppliers"
import Products from "./Component/Products"
import Logout from "./Component/Logout"
import Users from "./Component/Users"
import Sidebar from "./Component/Sidebar"
import UserProduct from "./Component/UserProduct"
import Order from "./Component/Order"
import Profile from "./Component/Profile"
import Summary from "./Component/Summary"

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
element={<Summary/>}
/>

<Route path="categories"
element={<Categories/>}
/>
<Route path="products"
element={<Products/>}
/>
<Route path="suppliers"
element={<Suppliers/>}
/>
<Route path="orders"
element={<Order/>}
/>
<Route path="users"
element={<Users/>}
/>
<Route path="profile"
element={<h1>Profile</h1>}
/>

<Route path="logout"
element={<Logout/>}
/>

</Route>
      {/* user routes */}
      <Route
        path="/user-dashboard/"
        element={
          <ProtectedRoute role={"user"}>
            <Dashboard/>
         </ProtectedRoute>
        }
      >
        <Route path="orders" element={<Order/>}/>
        <Route path="logout" element={<Logout/>}/>
        <Route path="profile" element={<Profile/>}/>




       <Route path="products"
element={<UserProduct/>}
/>
      </Route>

      {/* fallback */}
      <Route path="*" element={<h1>404 Not Found</h1>} />
      <Route path="/unauthorized" element={<h1>Unauthorized</h1>} />


    </Routes>
  )
}

export default App