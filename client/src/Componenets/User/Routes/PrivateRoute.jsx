import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { userAxiosInstance as api } from "../../../axios/Axios";
import { userLogin, userLogout } from "../../../store/userSlice";

function PrivateRoute() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("userToken");
  const [user, setUser] = useState(false);
  const navigate=useNavigate()
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
         if (error.response && error.response.status === 500) {
         
          // Handle the 500 internal server error by redirecting to the error page
          navigate('/serverError');
        } else if(error.response && error.response.status===403){
          const errorstatus='403'
          navigate(`/error?error=${errorstatus}`)
        }else if(error.response && error.response.status===401){
          const errorstatus='401'
          navigate(`/error?error=${errorstatus}`)
        }else if(error.response && error.response.status===400){
          alert('user is blocked')
          navigate('/login')
        }
         {
          // Handle other errors here
          console.error("Error uploading images:", error);
        
          throw error; // Propagate the error
        }
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
