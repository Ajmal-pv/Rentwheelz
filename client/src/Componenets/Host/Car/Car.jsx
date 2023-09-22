
import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import NewCarForm from './Carform';
import Modal from 'react-modal';
import './car.css';
import { hostCar } from '../../../services/host-service';


function Car() {
  const hostId = localStorage.getItem('hostId')
  
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [callApi, setCallApi] = useState(false);


    const openModal = () => {
      setModalIsOpen(true);
    };
  
    const closeModal = () => {
      setCallApi(true)
      setModalIsOpen(false);
     

    };
    
    const [cars,setCars] = useState({})
  
  useEffect(() => {
   
  if(hostId){
  
   hostCar(hostId)
      .then((response) => {
        
         if(response.data.status){
       
           setCars(response.data.Cars)

        }
   
        
      })
      .catch((error) => {
       console.log(error);
        console.log(error.message);
      });

  }
  }, [hostId,callApi])
  
    
  return (
    <div className="flex-1 p-6">
         <Modal
        isOpen={modalIsOpen}
       
        className="modal-content custom-width-642  "
        overlayClassName="modal-overlay"
      >
       <NewCarForm onClose={closeModal} />
      </Modal>
        {/* Content for each section goes here */}
        <h1 className="text-2xl font-semibold mb-4">Cars</h1>
       

        <div className='flex justify-end pb-2'>
        <button
        onClick={openModal}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Add New Car 
      </button>
     
        </div>
        <div className="bg-white p-4 shadow rounded ">
          
     
      <main className="flex-1  overflow-x-hidden">
       
        {/* Other components and content */}
        <div className="overflow-x-auto ">
      <table className="min-w-full rounded-lg overflow-hidden bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-300 text-left">Registration Number</th>
            <th className="py-2 px-4 border-b border-gray-300 text-left">image</th>
            <th className="py-2 px-4 border-b border-gray-300 text-left">Car Brand</th>
            <th className="py-2 px-4 border-b border-gray-300 text-left">Car Model</th>
            <th className="py-2 px-4 border-b border-gray-300 text-left">Monthly rent</th>
           
            <th className="py-2 px-4 border-b border-gray-300 text-left">Verification</th>
            <th className="py-2 px-4 border-b border-gray-300 text-left">Details</th>


          
            {/* ... Add more headers as needed */}
          </tr>
        </thead>

        {cars.length > 0 && (
  <tbody>
        {cars.map((car) => (
          <tr key={car._id}>
         <td className="py-2 px-4 border-b border-gray-300">{car.RegistrationNumber}</td>
            <td className="py-2 px-4 border-b border-gray-300">
             
                <img src={car.images[0]} alt={`Car 1`} className="w-12 h-12 object-cover" />

            
            </td>
            <td className="py-2 px-4 border-b border-gray-300">{car.carBrand}</td>
            <td className="py-2 px-4 border-b border-gray-300">{car.carModel}</td>
           
            <td className="py-2 px-4 border-b border-gray-300">{car.rentalPrice}</td>
            <td className={`py-2 px-4 border-b border-gray-300 ${car.approved === 'Approved' ? 'text-green-600' : car.approved === 'Rejected' ? 'text-red-600' : car.approved === 'Blocked' ? 'text-red-600' : 'text-yellow-600'}`}>{car.approved}</td>
            
            <td className="py-2 px-4 border-b border-gray-300">
            <Link
    to={`/host/cardetails?id=${car._id}`}
    className="text-white bg-green-600 hover:bg-green-700 py-2 px-2 rounded "
  >
    Details
  </Link>
              
            </td>
          </tr>
        ))}
      </tbody>
        )}
      </table>
     
    </div>
      </main>
        </div>
       
      </div>
      
  )
}

export default Car
