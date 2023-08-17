import React,{ useEffect,useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import {Routes,Route} from 'react-router-dom' 
import { Navigate } from 'react-router-dom';
import Login from '../Pages/User/UserLogin'
import Signup from '../Pages/User/UserSignUp'
import Home from '../Pages/User/UserHome'
import  Cookies from 'js-cookie'
import { userAxiosInstance as api} from '../axios/Axios'
import { userLogin, userLogout } from '../store/userSlice';
import UserForgot from '../Pages/User/UserForgot';
import UserForgotOtp from '../Pages/User/UserForgotOtp';
import UserNewPassword from '../Pages/User/UserNewPassword';
import UserProfile from '../Pages/User/UserProfile';


function User() {
  const dispatch = useDispatch();
  

  
 
  useEffect(() => {
    
    const token = Cookies.get('user');
   

    if (token) {
      
      api.post('verifyToken')
      .then((response) => {
         if(response.data.status){
       
         dispatch(userLogin());

        }else{

          Cookies.remove("user")
          dispatch(userLogout());

        }
   
        
      })
      .catch((error) => {
       
        console.log(error.message);
        Cookies.remove("user")
         dispatch(userLogout());
      });

     
     
    } else {
      
   
    dispatch(userLogout());

    }
  }, []);
  const user = useSelector((state) => state.user.authorized);
  return (
 
    <div>
      <Routes>
      <Route  path='/' element={<Home/>}/>
      <Route path='/home' element={<Home/>}/>
 


        <Route   path="/login"
        element={user ? <Navigate to={"/"} /> :<Login/>}/>
        <Route path='/signup' element={user ? <Navigate to={"/"} /> :<Signup/>}/>
        <Route path='/forgot-password' element={<UserForgot/>} />
   
        <Route path='/forgot-otp' element={<UserForgotOtp/>} />
        <Route path='/password-change' element={ <UserNewPassword/>} />
        <Route path='/profile' element={ <UserProfile/>} />
        

        


      </Routes>
    </div>
  )
}

export default User
