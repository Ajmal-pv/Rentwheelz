import React, { useEffect, useState } from 'react'
import { car } from '../../../services/admin-Service'
import { Link, useNavigate } from 'react-router-dom';

function Car() {
  const navigate = useNavigate()
  const [allcars,setAllCars] = useState([])
    const [cars,setCars] = useState([])
    
    const[blocked,setBlocked]=useState([])
    const[approved,setApproved]=useState([])
    const[pending,setPending]=useState([])
    const [selectedHost, setSelectedHost] = useState(null);
    const [apiCall,setApiCall]=useState(false)

   

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
  setAllCars(res.data.carData)
  setBlocked(res.data.carBlocked)
  setApproved(res.data.carApproved)
  setPending(res.data.carPending)

      }else{
        setCars([])
        setApproved([])
        setBlocked([])
        setPending([])
      }
    })
   }, [apiCall])


   const blockedCars=()=>{
    setCars(blocked)
  }
  const approvedCars=()=>{
    setCars(approved)
  }
  const pendingCars=()=>{
    setCars(pending)
  }
  const AllCars=()=>{
    setCars(allcars)
  }
   
    
  return (
    
     
      <main className="flex-1 p-4 overflow-x-hidden">
        {/* Your main content goes here */}
        <div className=' transition-colors'>
        <h1 className="text-2xl font-semibold  mb-4 mt-6 border-gray-800 ">CARS</h1>
        <div className='flex justify-end '>
        <button
       onClick={AllCars}
        className="bg-black hover:bg-black  text-white  font-bold py-2 m-2 px-4 rounded"
        
      >
        All
      </button>
        <button
       onClick={pendingCars}
        className="bg-yellow-500 hover:bg-yellow-600  text-white  font-bold py-2 m-2 px-4 rounded"
        
      >
        Pendings
      </button>
      <button
       onClick={approvedCars}
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 m-2 rounded"
      >
        Approved
      </button>
      <button
       onClick={blockedCars}
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded m-2"
      >
        Blocked 
      </button>
     
        </div>
        </div>
       
        {/* Other components and content */}
        <div className="overflow-x-auto mt-6">
      <table className="min-w-full rounded-lg overflow-hidden bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-300 text-left">Host</th>
            <th className="py-2 px-4 border-b border-gray-300 text-left">image</th>
            <th className="py-2 px-4 border-b border-gray-300 text-left">Car Brand</th>
            <th className="py-2 px-4 border-b border-gray-300 text-left">Car Model</th>
            <th className="py-2 px-4 border-b border-gray-300 text-left">licenseNumber</th>
            <th className="py-2 px-4 border-b border-gray-300 text-left">Verification</th>
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
            <td className="py-2 px-4 border-b border-gray-300">{car.Brand}</td>
            <td className="py-2 px-4 border-b border-gray-300">{car.model}</td>
           
            <td className="py-2 px-4 border-b border-gray-300">{car.RegistrationNumber}</td>
            <td className={`py-2 px-4 border-b border-gray-300 ${car.status === 'Approved' ? 'text-green-600' : car.status === 'Rejected' ? 'text-red-600' : car.status === 'Blocked' ? 'text-red-600' : 'text-yellow-600'}`}>{car.status}</td>
            
            <td className="py-2 px-4 border-b border-gray-300">
              {/* <Link to={`/cardetails?id=${car._id}`} className="text-blue-500 font-bold" >
              Details 
              </Link> */}
              <button className='text-blue-600' onClick={()=>{navigate(`cardetails?id=${car._id}`)}}>Details</button>
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

