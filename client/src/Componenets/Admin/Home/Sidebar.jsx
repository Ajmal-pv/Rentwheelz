import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; // If you're using React Router
import { adminLogout } from "../../../store/adminSlice";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation()
  const [logout, setLogout] = useState(false);
  const handleLogout = () => {
    setLogout(true);
  };
  const isActiveLink = (pathnames) => {
    return pathnames.includes(location.pathname);
  };
  useEffect(() => {
    if (logout) {
      Cookies.remove("admin");
      dispatch(adminLogout());

      navigate("/admin/login");
    }
  }, [logout]);
  return (
    <aside className="w-64 bg-gray-800 text-white h-screen flex flex-col">
      <div className="p-4 mb-12 mt-6">
        <h2 className="text-xl font-semibold">Rent Wheelz</h2>
      </div>
      <nav className="flex-1">
        <ul className="space-y-2">
          <li className={`p-4 hover:bg-slate-500 ${isActiveLink(["/admin","/admin/dashboard"]) ? "bg-slate-500" : ""}`}>
            <Link to="/dashboard" className="block">
              Dashboard
            </Link>
          </li>
          <li className={`p-4 hover:bg-slate-500 ${isActiveLink(["/admin/car"]) ? "bg-slate-500" : ""}`}>
            <Link to="/admin/car" className="block">
              Cars
            </Link>
          </li>
          <li className={`p-4 hover:bg-slate-500 ${isActiveLink(["/admin/host"]) ? "bg-slate-500" : ""}`}>
            <Link to="/admin/host" className="block">
              Hosts
            </Link>
          </li>
          {/* Add more links as needed */}
          <li className="p-4 hover:bg-slate-500">
            <Link onClick={handleLogout} className="block">
              logout
            </Link>
          </li>
        </ul>
      </nav>
      <div className="p-4">
        <p className="text-sm">Logged in as Admin</p>
      </div>
    </aside>
  );
};

export default Sidebar;