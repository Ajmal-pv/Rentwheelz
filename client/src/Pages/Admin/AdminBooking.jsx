import React from 'react'
import Sidebar from '../../Componenets/Admin/Home/Sidebar'
import Bookings from '../../Componenets/Admin/Bookings/Bookings'

function AdminBooking() {
  return (
    <div className="flex bg-gray-100 w-[100vw]">
    <div className="w-full flex">
      <div className="w-[15vw] h-[100vh]   ">
        <Sidebar />
      </div>
      <div className="w-[85vw] flex-1  ">
        <Bookings />
      </div>
    </div>
  </div>
  )
}

export default AdminBooking