import React, { useEffect } from 'react'
import {Routes,Route} from 'react-router-dom' 
import AdminLoginPage from '../Pages/Admin/AdminLoginPage'
import { adminAxiosInstance as api } from '../axios/Axios'
import { useDispatch, useSelector } from 'react-redux'
import { adminLogin, adminLogout } from '../store/adminSlice'
import Cookies from 'js-cookie'
import { Navigate } from 'react-router-dom';
import AdminHome from '../Pages/Admin/AdminHome'




function Admin() {
 
  const dispatch = useDispatch()
  useEffect(() => {
    
    const token = Cookies.get('admin');
   

    if (token) {
      
      api.post('verifyToken')
      .then((response) => {
         if(response.data.status){
       
         dispatch(adminLogin());
        }else{

          Cookies.remove("admin")
          dispatch(adminLogout());

        }
   
        
      })
      .catch((error) => {
       
        console.log(error.message);
        Cookies.remove("admin")
         dispatch(adminLogout());
      });

     
     
    } else {
      
   
    dispatch(adminLogout());

    }
  }, []);
  const admin = useSelector((state) => state.admin.authorized);
  return (
    
    <div>
      
      <Routes>
      <Route path='/' element={ admin ? <AdminHome/> : <Navigate to={'/admin/login'}/> }/>
        <Route path='/login' element={ admin ? <Navigate to={'/admin'}/> : <AdminLoginPage/>}/>
       
        <Route path='/home' element={ admin ? <AdminHome/> : <Navigate to={'/admin/login'}/> }/>
       
      </Routes>
    </div>
  )
}

export default Admin
