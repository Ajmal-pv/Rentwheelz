import React from 'react'
import Sidebar from '../../Componenets/Host/Home/Sidebar'
import CarDetails from '../../Componenets/Host/Car/CarDetails'

function HostCarDetail() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar/>
      <CarDetails/>
    </div>
  )
}

export default HostCarDetail
