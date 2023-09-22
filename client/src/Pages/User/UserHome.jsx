import React from'react'

import NavBar from '../../Componenets/User/Home/NavBar'
import Banner from '../../Componenets/User/Home/Banner'
import RelatedCar from '../../Componenets/User/Home/RelatedCar'
import Footer from '../../Componenets/User/Home/Footer'


function HomePage() {
 

  return (
    <div>
      <NavBar />
      <Banner />
      <RelatedCar />
      <Footer/>
      
    </div>
  )
}

export default HomePage
