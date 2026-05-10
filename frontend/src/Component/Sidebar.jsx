import { useEffect, useState } from "react";
import {
  FaBox, FaCog, FaHome, FaShoppingCart,
  FaSignOutAlt, FaTable, FaTruck, FaUser
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/Authcontext";

const Sidebar = () => {

  const menuItems = [
    { name: "Dashboard", path: "/admin-dashboard", icon: <FaHome />,isParent:true},
    { name: "Categories", path: "/admin-dashboard/categories", icon: <FaTable />,isParent:false },
    { name: "Products", path: "/admin-dashboard/products", icon: <FaBox />,isParent:false  },
    { name: "Suppliers", path: "/admin-dashboard/suppliers", icon: <FaTruck />,isParent:false },
    { name: "Orders", path: "/admin-dashboard/orders", icon: <FaShoppingCart />,isParent:false },
    { name: "Users", path: "/admin-dashboard/users", icon: <FaUser />,isParent:false },
    { name: "Profile", path: "/admin-dashboard/profile", icon: <FaCog />,isParent:false },
    { name: "Logout", path: "/admin-dashboard/logout", icon: <FaSignOutAlt />,isParent:false },
  ];


  const UserItems= [
{ name: "Products", path: "/user-dashboard/products", icon: <FaBox />,isParent:true  },
{ name: "Orders", path: "/user-dashboard/orders", icon: <FaShoppingCart />,isParent:false },
 { name: "Profile", path: "/user-dashboard/profile", icon: <FaCog />,isParent:false },
    { name: "Logout", path: "/user-dashboard/logout", icon: <FaSignOutAlt />,isParent:false },
  ]

  const [menuLink,setMenuLink]=useState(UserItems)


  const {user}=useAuth()

  useEffect(()=>{
if(user && user.role ==="admin") {
  setMenuLink(menuItems)
}

  },[])

  return (
    <div className="flex flex-col h-screen w-16 md:w-64 fixed
    bg-gradient-to-b from-gray-800 to-gray-700 text-white shadow-xl">

      {/* Logo */}
      <div className="h-16 flex items-center justify-center border-b border-white/10">
        <span className="hidden md:block text-2xl font-semibold tracking-wide">
          Inventory MS
        </span>
        <span className="md:hidden text-2xl font-bold">IMS</span>
      </div>

      {/* Menu */}
      <ul className="flex-1 p-3 space-y-2">

        {menuLink.map((item) => (
          <li key={item.name}>
            <NavLink
            end={item.isParent}
              to={item.path}
              className={({ isActive }) =>
                `group flex items-center gap-3 px-3 py-2 rounded-xl
                transition-all duration-200
                ${isActive
                  ? "bg-white/10 backdrop-blur text-white shadow-md"
                  : "text-gray-400 hover:text-white hover:bg-white/20"}`
              }
            >
              {/* Icon */}
              <span className="text-lg group-hover:scale-120 transition">
                {item.icon}
              </span>

              {/* Text */}
              <span className="hidden md:block text-xl font-medium">
                {item.name}
              </span>
            </NavLink>
          </li>
        ))}

      </ul>

      {/* Footer */}
      <div className="p-3 border-t border-white/10 text-center text-xs text-gray-400">
        © 2026 IMS
      </div>

    </div>
  );
};

export default Sidebar;