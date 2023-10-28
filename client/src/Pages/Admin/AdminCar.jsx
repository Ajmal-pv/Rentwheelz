import React from 'react'
import Car from '../../Componenets/Admin/carPage/Car'
import Sidebar from '../../Componenets/Admin/Home/Sidebar'

function AdminCar() {
  return (
    <div className="flex bg-gray-100 w-[100vw]">
    <div className="w-full flex">
      <div className="w-[15vw] h-[100vh]   ">
        <Sidebar />
      </div>
      <div className="w-[85vw] flex-1  ">
        <Car/>
      </div>
    </div>
  </div>
  )
}

export default AdminCar
