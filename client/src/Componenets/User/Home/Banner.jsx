import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import the carousel styles
import { Carousel } from 'react-responsive-carousel';


function Banner() {
    
  return (
   
             <Carousel showArrows={false} showThumbs={false} autoPlay infiniteLoop className='    bg-black '>
          <div className='  overflow-hidden  bg-red-500 ' >
            <img src='/banner1.png' alt="Banner 1" className='overflow-hidden h-full '  />
          </div>
          
          {/* Add more slides as needed */}
        </Carousel>
      
  )
}

export default Banner
