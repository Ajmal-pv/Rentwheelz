import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { adminAxiosInstance as api } from "../../../axios/Axios";
import { adminLogin, adminLogout } from "../../../store/adminSlice";


function PublicRoute() {
    const dispatch = useDispatch()
    useEffect(() => {
      
      const token = localStorage.getItem('AdminToken')
     
  
      if (token) {
        
        api.post('verifyToken')
        .then((response) => {
           if(response.data.status){
         
           dispatch(adminLogin());
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
    const admin = useSelector((state) => state.admin.authorized);
    if (admin) {
      return (
        <>
         <Navigate to={"/admin"} />
          
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

