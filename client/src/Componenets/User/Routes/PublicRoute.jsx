import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { userAxiosInstance as api } from "../../../axios/Axios";
import { userLogin, userLogout } from "../../../store/userSlice";


function PublicRoute() {
    const dispatch = useDispatch();
    const navigate= useNavigate()
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
            alert('error')
            if (error.response) {
              // The request was made and the server responded with an error status code
              if (error.response.status === 500) {
                // Internal Server Error occurred
                navigate('/serverError')
              } else {
                // Handle other non-500 errors here, if needed
                toast.error(error.response.data.message);
              }
            } else {
              navigate('/serverError')
            }
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
