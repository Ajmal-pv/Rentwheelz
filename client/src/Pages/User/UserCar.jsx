import React from 'react'
import Navbar from '../../Componenets/User/Home/NavBar'
import Car from '../../Componenets/User/Car/Car'
import Footer from '../../Componenets/User/Home/Footer'


function UserCar() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar/>
     <Car/>
     <Footer/>
    </div>
    
  )
}

export default UserCar
