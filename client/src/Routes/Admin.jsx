import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import AdminLoginPage from "../Pages/Admin/AdminLoginPage";
import { adminAxiosInstance as api } from "../axios/Axios";
import { useDispatch, useSelector } from "react-redux";
import { adminLogin, adminLogout } from "../store/adminSlice";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import AdminHome from "../Pages/Admin/AdminHome";
import AdminCar from "../Pages/Admin/AdminCar";
import AdminHost from "../Pages/Admin/AdminHost";
import AdminCarDetails from "../Pages/Admin/AdminCarDetails";
import AdminUser from "../Pages/Admin/AdminUser";
import PublicRoute from "../Componenets/Admin/Routes/PublicRoute";
import PrivateRoute from "../Componenets/Admin/Routes/PrivateRoute";
import AdminBanner from "../Pages/Admin/AdminBanner";
import AdminBooking from "../Pages/Admin/AdminBooking";
import NotFound from "../Pages/error/NotFound";

function Admin() {
  return (
    <div>
      <Routes>
        {/* Public Routess   */}
        <Route path="/" element={<PublicRoute />}>
          <Route path="/login" element={<AdminLoginPage />} />
        </Route>
        {/* PrivateRoutes */}
        <Route path="/" element={<PrivateRoute />}>
          <Route index element={<AdminHome />} />

          <Route path="/home" element={<AdminHome />} />
          <Route path="/car" element={<AdminCar />} />
          <Route path="/car/cardetails" element={<AdminCarDetails />} />
          <Route path="/host" element={<AdminHost />} />
          <Route path="/cardetails" element={<AdminCarDetails />} />
          <Route path="/user" element={<AdminUser />} />
          <Route path="/banner" element={<AdminBanner />} />
          
          <Route path="/bookings" element={<AdminBooking />} />
        </Route>
        <Route
        path="*"
        element={
          <NotFound redirectTo="/admin/home" />
        }
      />

      </Routes>
    </div>
  );
}

export default Admin;
