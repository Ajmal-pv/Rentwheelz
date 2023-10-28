import React from 'react'
import Home from '../../Componenets/Admin/Home/Home'
import Sidebar from '../../Componenets/Admin/Home/Sidebar'

function AdminHome() {
  return (
    <div className="flex bg-gray-100 w-[100vw]">
      <div className="w-full flex">
        <div className="w-[15vw] h-[100vh]   ">
          <Sidebar />
        </div>
        <div className="w-[85vw] flex-1  ">
          <Home />
        </div>
      </div>
    </div>
  )
}

export default AdminHome
