import React, { useEffect } from 'react'
import {Routes,Route} from 'react-router-dom' 
import { Navigate } from 'react-router-dom';

import HostSignup from '../Pages/Host/HostSignup'
import HostCarform from '../Pages/Host/HostCarform'
import HostLogin from '../Pages/Host/HostLogin'
import HostHome from '../Pages/Host/HostHome'
import { hostAxiosInstance as api } from '../axios/Axios'
import { useDispatch, useSelector } from 'react-redux'
import { hostLogin, hostLogout } from '../store/hostSlice'
import Cookies from 'js-cookie'




function Host() {

  const dispatch = useDispatch()

  useEffect(() => {
    
    const token = Cookies.get('host');
   

    if (token) {
      
      api.post('verifyToken')
      .then((response) => {
         if(response.data.status){
       
         dispatch(hostLogin());

        }else{

          Cookies.remove("host")
          dispatch(hostLogout());

        }
   
        
      })
      .catch((error) => {
       
        console.log(error.message);
        Cookies.remove("host")
         dispatch(hostLogout());
      });

     
     
    } else {
      
   
    dispatch(hostLogout());

    }
  }, []);
  const host = useSelector((state) => state.host.authorized);
  return (

    <div>
  
    
  <Routes>
  <Route path="/" element={host ? <HostHome /> : <Navigate to="/host/login" />} />

  <Route path="/home" element={host ? <HostHome /> : <Navigate to="/host/login" />} />
  <Route path="/become-host" element={host ? <Navigate to="/host" /> : <HostSignup />} />
  <Route path="/carForm" element={<HostCarform />} />
  <Route path="/login" element={host ? <Navigate to="/host" /> : <HostLogin />} />
</Routes>

    </div>
  )
}

export default Host
