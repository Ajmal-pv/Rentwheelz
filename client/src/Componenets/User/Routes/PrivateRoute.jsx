import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { userAxiosInstance as api } from "../../../axios/Axios";
import { userLogin, userLogout } from "../../../store/userSlice";

function PrivateRoute() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("userToken");
  const [user, setUser] = useState(false);
  useEffect(() => {
    if (token) {
      api
        .post("verifyToken")
        .then((response) => {
         
          if (response.data.status) {
            dispatch(userLogin({userId:response.data.user._id}));
            setUser(true);
          } else {
            localStorage.removeItem("userToken");
            dispatch(userLogout());
          }
        })
        .catch((error) => {
         console.log(error);
        });
    } else {
      dispatch(userLogout());
    }
  }, []);

 

  if ( token && user) {
    return (
      <>
        <Outlet />
      </>
    );
  } 
  else if (token && !user) {
    return null;
  }else {
    return (
      <>
        <Navigate to={"/login"} />
      </>
    );
  }
}

export default PrivateRoute;
