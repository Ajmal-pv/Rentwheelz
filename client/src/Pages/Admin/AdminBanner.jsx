import React from 'react'
import Sidebar from '../../Componenets/Admin/Home/Sidebar'
import Banner from '../../Componenets/Admin/Banner/Banner'

function AdminBanner() {
  return (
    <div className="flex bg-gray-100 w-[100vw]">
    <div className="w-full flex">
      <div className="w-[15vw] h-[100vh]   ">
        <Sidebar />
      </div>
      <div className="w-[85vw] flex-1  ">
        <Banner />
      </div>
    </div>
  </div>
  )
}

export default AdminBanner
