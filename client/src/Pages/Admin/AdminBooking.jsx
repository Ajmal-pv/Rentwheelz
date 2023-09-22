import React from 'react'
import Sidebar from '../../Componenets/Admin/Home/Sidebar'
import Bookings from '../../Componenets/Admin/Bookings/Bookings'

function AdminBooking() {
  return (
    <div>
        <div className="flex h-screen bg-gray-100">
       <Sidebar/>
       <Bookings/>
      
      </div>
    </div>
  )
}

export default AdminBooking