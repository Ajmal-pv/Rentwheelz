import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import the carousel styles
import { Carousel } from 'react-responsive-carousel';


function Banner() {
    
  return (
   
        <Carousel showArrows={false} autoPlay infiniteLoop>
          <div>
            <img src={image} alt="Banner 1" />
          </div>
          <div>
            <img src='' alt="Banner 2" />
          </div>
          {/* Add more slides as needed */}
        </Carousel>
  )
}

export default Banner
