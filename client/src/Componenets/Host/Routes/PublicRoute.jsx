import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { hostAxiosInstance as api } from "../../../axios/Axios";

import { hostLogin, hostLogout } from "../../../store/hostSlice";


function PublicRoute() {
    const dispatch = useDispatch();
   
    useEffect(() => {
    
        const token = localStorage.getItem('hostToken')
       
    
        if (token) {
          
          api.post('verifyToken')
          .then((response) => {
             if(response.data.status){
             dispatch(hostLogin(response.data.hostid));
    
            }else{
    
             localStorage.removeItem('hostToken')
              dispatch(hostLogout());
    
            }
       
            
          })
          .catch((error) => {
           
            console.log(error.message);
            localStorage.removeItem('hostToken')
             dispatch(hostLogout());
          });
    
         
         
        } else {
          
       
        dispatch(hostLogout());
    
        }
      }, []);
      const host = useSelector((state) => state.host.authorized);
  
    if (host) {
      return (
        <>
         <Navigate to={"/host"} />
          
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

