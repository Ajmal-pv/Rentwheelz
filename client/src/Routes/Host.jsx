import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import HostSignup from "../Pages/Host/HostSignup";
import HostCarform from "../Pages/Host/HostCarform";
import HostLogin from "../Pages/Host/HostLogin";
import HostHome from "../Pages/Host/HostHome";
import { hostAxiosInstance as api } from "../axios/Axios";
import { useDispatch, useSelector } from "react-redux";
import { hostLogin, hostLogout } from "../store/hostSlice";
import Hostcar from "../Pages/Host/Hostcar";
import HostCarDetail from "../Pages/Host/HostCarDetail";
import PublicRoute from "../Componenets/Host/Routes/PublicRoute";
import PrivateRoute from "../Componenets/Host/Routes/PrivateRoute";
import HostCarform2 from "../Pages/Host/HostCarform2";
import HostBooking from "../Pages/Host/HostBooking";
import NotFound from "../Pages/error/NotFound";
import HostPayment from "../Pages/Host/HostPayment";
import HostChat from "../Pages/Host/HostChat";

function Host() {
  return (
    <div>
 <Routes>
  {/* Public Routes */}
  <Route path="/carform" element={<HostCarform2 />} />
     <Route path="/" element={<PublicRoute />}>
          <Route path="/login" element={<HostLogin />} />
          <Route path="/become-host" element={<HostSignup />} />
     </Route>
     {/* privateRoutes */}
     <Route path="/" element={<PrivateRoute />}>
          <Route index element={<HostHome />} />
          <Route path="/home" element={<HostHome />} />
          <Route path="/cars" element={<Hostcar />} />
          <Route path="/cardetails" element={<HostCarDetail />} />
          <Route path="/carForm" element={<HostCarform />} />
          <Route path="/carForm" element={<HostCarform />} />
          <Route path="/bookings" element={<HostBooking />} />
          <Route path="/payments" element={<HostPayment />} />
          <Route path="/messages" element={<HostChat />} />
         
        
     </Route>
     <Route
        path="*"
        element={
          <NotFound redirectTo="/host/home" />
        }
      />

  </Routes>
    </div>
  );
}

export default Host;
