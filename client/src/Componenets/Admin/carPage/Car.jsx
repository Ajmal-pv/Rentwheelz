import React, { useEffect, useState } from 'react'
import { car } from '../../../services/admin-Service'
import { Link } from 'react-router-dom';

function Car() {
    const [cars,setCars] = useState([])
    const [selectedHost, setSelectedHost] = useState(null);

  const openHostPopup = (host) => {
    setSelectedHost(host);
  };

  const closeHostPopup = () => {
    setSelectedHost(null);
  };
   useEffect(() => {
    car().then((res)=>{
      if(res.data.cars){
  setCars(res.data.carData)
      }else{
        setCars({})
      }
    })
   }, [cars])
   
    
  return (
    
     
      <main className="flex-1 p-4 overflow-x-hidden">
        {/* Your main content goes here */}
        <div className=' transition-colors'>
        <h1 className="text-2xl font-semibold  mb-8 mt-6 border-gray-800 ">CARS</h1>
        </div>
        {/* Other components and content */}
        <div className="overflow-x-auto mt-16">
      <table className="min-w-full rounded-lg overflow-hidden bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-300 text-left">Host</th>
            <th className="py-2 px-4 border-b border-gray-300 text-left">image</th>
            <th className="py-2 px-4 border-b border-gray-300 text-left">Car Brand</th>
            <th className="py-2 px-4 border-b border-gray-300 text-left">Car Model</th>
            <th className="py-2 px-4 border-b border-gray-300 text-left">licenseNumber</th>
            <th className="py-2 px-4 border-b border-gray-300 text-left">Details</th>


          
            {/* ... Add more headers as needed */}
          </tr>
        </thead>
        <tbody>
        {cars.map((car) => (
          <tr key={car._id}>
            <td className="py-2 px-4 border-b border-gray-300">
                {car.hostId.name && (
                  <button
                    onClick={() => openHostPopup(car.hostId)}
                    className="text-blue-500 hover:underline focus:outline-none"
                  >
                    {car.hostId.name}
                  </button>
                )}
              </td>
            <td className="py-2 px-4 border-b border-gray-300">
             
                <img src={car.images[0]} alt={`Car 1`} className="w-12 h-12 object-cover" />

            
            </td>
            <td className="py-2 px-4 border-b border-gray-300">{car.carBrand}</td>
            <td className="py-2 px-4 border-b border-gray-300">{car.carModel}</td>
           
            <td className="py-2 px-4 border-b border-gray-300">{car.licenseNumber}</td>
            
            <td className="py-2 px-4 border-b border-gray-300">
              <Link>
              details 
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
      </table>
      {selectedHost && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">
            {selectedHost.name}
             

            </h2>
            <h2 className="text-lg font-semibold mb-2">{selectedHost.email}</h2>
            <h2 className="text-lg font-semibold mb-2">{selectedHost.mobile}</h2>
            <h2 className='text-lg font-semibold mb-2'>{selectedHost.is_verified ? "Verified" : "Not Verified"}</h2>


            {/* Render host details here */}


            <button
              onClick={closeHostPopup}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
      </main>
    
  )
}

export default Car

