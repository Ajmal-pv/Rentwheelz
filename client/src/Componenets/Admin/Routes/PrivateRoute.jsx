
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { adminAxiosInstance as api } from "../../../axios/Axios";
import { adminLogin, adminLogout } from "../../../store/adminSlice";


function PrivateRoute() {
    const dispatch = useDispatch()
    const token = localStorage.getItem('AdminToken')
    const [admin, setAdmin] = useState(false);
    useEffect(() => {
      
     
      if (token) {
        
        api.post('verifyToken')
        .then((response) => {
           if(response.data.status){
         
           dispatch(adminLogin());
           setAdmin(true)
          }else{
  
            localStorage.removeItem('AdminToken')
            dispatch(adminLogout());
  
          }
     
          
        })
        .catch((error) => {
         
          console.log(error.message);
          localStorage.removeItem('AdminToken')
           dispatch(adminLogout());
        });
  
       
       
      } else {
        
     
      dispatch(adminLogout());
  
      }
    }, []);
    

  if (token && admin) {
    return (
      <>
        <Outlet />
      </>
    )
  }else if (token && !admin) {
    return null;
  } else {
    return (
      <>
        <Navigate to={"/admin/login"} />
      </>
    );
  }
}

export default PrivateRoute;

