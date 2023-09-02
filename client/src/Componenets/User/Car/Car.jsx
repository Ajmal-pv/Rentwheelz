import React, { useEffect, useState } from 'react'
import { cars } from '../../../services/user-Service'

function Car() {
    const[cars1,setCars1]=useState([])
    useEffect(() => {
      cars().then((res)=>{
        if(res.data.status){
  setCars1(res.data.cars)
        }
      })
    
      
    }, [cars1])
    
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        
      {cars1.map((car) => (
        <div className="bg-white rounded-lg shadow-md p-6">
        <img src={car.images[0]} alt={`Car ${car.id}`} className="w-full h-40 object-cover rounded" />
        <h2 className="text-xl font-semibold mt-3">{car.carModel}</h2>
        <p className="text-gray-600">{car.carBrand}</p>
        <p className="mt-2"> ₹ {car.rentalPrice} per month</p>
        <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
          Rent Now
        </button>
      </div>
      ))}
    </div>
   
  )}

export default Car
