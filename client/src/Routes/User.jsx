import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Login from "../Pages/User/UserLogin";
import Signup from "../Pages/User/UserSignUp";
import Home from "../Pages/User/UserHome";
import Cookies from "js-cookie";
import { userAxiosInstance as api } from "../axios/Axios";
import { userLogin, userLogout } from "../store/userSlice";
import UserForgot from "../Pages/User/UserForgot";
import UserForgotOtp from "../Pages/User/UserForgotOtp";
import UserNewPassword from "../Pages/User/UserNewPassword";
import UserProfile from "../Pages/User/UserProfile";
import UserCar from "../Pages/User/UserCar";
import toast, { Toaster } from "react-hot-toast";
import PrivateRoute from "../Componenets/User/Routes/PrivateRoute";
import PublicRoute from "../Componenets/User/Routes/PublicRoute";
<PublicRoute />;

function User() {
 
  return (
    <div>
      {/* private route */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cars" element={<UserCar />} />
     
        {/* private Route */}


        <Route path="/" element={<PrivateRoute/>}>
          <Route path="/profile" element={<UserProfile />} />
        </Route>

        {/* public routes */}


        <Route path="/" element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<UserForgot />} />
        <Route path="/forgot-otp" element={<UserForgotOtp />} />
        <Route path="/password-change" element={<UserNewPassword />} />
        </Route>


      </Routes>
      <Toaster />
    </div>
  );
}

export default User;
