import React from 'react'
import Car from '../../Componenets/Admin/carPage/Car'
import Sidebar from '../../Componenets/Admin/Home/Sidebar'

function AdminCar() {
  return (
    <div>
        <div className="flex h-screen bg-gray-100">
       <Sidebar/>
      <Car/>
      </div>
    </div>
  )
}

export default AdminCar
