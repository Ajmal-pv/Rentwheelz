
import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'

import Modal from 'react-modal';
import BannerForm from './BannerForm';


function Car() {
 
    

  const [modalIsOpen, setModalIsOpen] = useState(false);
    const openModal = () => {
      setModalIsOpen(true);
    };
  
    const closeModal = () => {
      setCallApi(true)
      setModalIsOpen(false);
     

    };

   
 
  // useEffect(() => {
   
  // if(hostId){
  
  //  hostCar(hostId)
  //     .then((response) => {
        
  //        if(response.data.status){
       
  //          setCars(response.data.Cars)

  //       }
   
        
  //     })
  //     .catch((error) => {
  //      console.log(error);
  //       console.log(error.message);
  //     });

  // }
  // }, [hostId,callApi])
  
    
  return (
    <div className="flex-1 p-6">
          <Modal
        isOpen={modalIsOpen}
       
        className="modal-content custom-width-642  "
        overlayClassName="modal-overlay"
      >
       < BannerForm onClose={closeModal} />
      </Modal>
        {/* Content for each section goes here */}
        <h1 className="text-2xl font-semibold mb-4">Banners</h1>
       

        <div className='flex justify-end pb-2'>
        <button
       onClick={openModal}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Add New Banner 
      </button>
     
        </div>
        <div className="bg-white p-4 shadow rounded ">
          
     
      <main className="flex-1  overflow-x-hidden">
       
        {/* Other components and content */}
        <div className="overflow-x-auto ">
      <table className="min-w-full rounded-lg overflow-hidden bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-300 text-left">festive</th>
            <th className="py-2 px-4 border-b border-gray-300 text-left">image</th>



          
            {/* ... Add more headers as needed */}
          </tr>
        </thead>

        {/* {cars.length > 0 && (
  <tbody>
        {cars.map((car) => (
          <tr key={car._id}>
         <td className="py-2 px-4 border-b border-gray-300">{car.licenseNumber}</td>
            <td className="py-2 px-4 border-b border-gray-300">
             
                <img src={car.images[0]} alt={`Car 1`} className="w-12 h-12 object-cover" />

            
            </td>
            <td className="py-2 px-4 border-b border-gray-300">{car.carBrand}</td>
            <td className="py-2 px-4 border-b border-gray-300">{car.carModel}</td>
           
            <td className="py-2 px-4 border-b border-gray-300">{car.rentalPrice}</td>
            <td className={`py-2 px-4 border-b border-gray-300 ${car.approved === 'Approved' ? 'text-green-600' : car.approved === 'Rejected' ? 'text-red-600' : car.approved === 'Blocked' ? 'text-red-600' : 'text-yellow-600'}`}>{car.approved}</td>
            
            <td className="py-2 px-4 border-b border-gray-300">
            <button
                      onClick={() => handleDeleteBanner(banner._id)}
                      className={`bg-red-500 text-white hover:bg-red-700 py-1 px-3 rounded`}
                    >
                      Block Host
                    </button>
              
            </td>
          </tr>
        ))}
      </tbody>
        )} */}
      </table>
     
    </div>
      </main>
        </div>
       
      </div>
      
  )
}

export default Car
