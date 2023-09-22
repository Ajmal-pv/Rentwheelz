import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import the carousel styles
import { Carousel } from 'react-responsive-carousel';


function Banner() {
    
  return (
    <div className='h-[90vh] w-full '>
             <Carousel showArrows={false} showThumbs={false} autoPlay infiniteLoop className='h-[90vh]  bg-black '>
          <div className='h-[90vh] overflow-hidden bg-red-500 ' >
            <img src='/banner1.png' alt="Banner 1" className='overflow-hidden'  />
          </div>
          
          {/* Add more slides as needed */}
        </Carousel>
        </div>
  )
}

export default Banner
