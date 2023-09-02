import React from 'react'
import Sidebar from '../../Componenets/Admin/Home/Sidebar'
import CarDetails from '../../Componenets/Admin/carPage/CarDetails'

function AdminCarDetails() {
  return (
   
     <div>
    
     <div className="flex h-screen bg-gray-100">
      <Sidebar/>
     <CarDetails/>
     </div>
   </div>
  )
}

export default AdminCarDetails
