import React from 'react'

import Navbar from '../../Componenets/User/Home/NavBar'
import RelatedCar from '../../Componenets/User/Home/RelatedCar'
import Footer from '../../Componenets/User/Home/Footer'
import CarDetails from '../../Componenets/User/Car/CarDetails'

function UserCarDetails() {
  return (
    <div>
     <Navbar/>
      <CarDetails/>
      <RelatedCar/>
      <Footer/>
    </div>
  )
}

export default UserCarDetails
