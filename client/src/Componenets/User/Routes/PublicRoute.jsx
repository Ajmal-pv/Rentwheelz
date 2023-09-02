import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { userAxiosInstance as api } from "../../../axios/Axios";
import { userLogin, userLogout } from "../../../store/userSlice";


function PublicRoute() {
    const dispatch = useDispatch();
    const token = localStorage.getItem("userToken");
    useEffect(() => {
      if (token) {
        api
          .post("verifyToken")
          .then((response) => {
           
            if (response.data.status) {
              dispatch(userLogin({userId:response.data.user._id}));
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
  
    const user = useSelector((state) => state.user.authorized);
  
    if (user) {
      return (
        <>
         <Navigate to={"/home"} />
          
        </>
      );
    } else {
      return (
        <>
         <Outlet />
        </>
      );
    }
}

export default PublicRoute
