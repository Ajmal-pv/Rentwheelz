import React from 'react'

function CarDetails() {
  return (
    <div>
      <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-1/2">
        <img src={car.images[0]} alt={`Car`} className="w-full h-auto" />
      </div>
      <div className="w-full md:w-1/2 p-4">
        <h2 className="text-2xl font-semibold mb-2">{car.carModel}</h2>
        <p className="mb-2">License Number: {car.licenseNumber}</p>
        <p className="mb-2">City: {car.city}</p>
        {/* Add more car details */}
      </div>
    </div>
    </div>
  )
}

export default CarDetails
