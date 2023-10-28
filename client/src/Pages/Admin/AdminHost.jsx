import React from 'react'
import Sidebar from '../../Componenets/Admin/Home/Sidebar'
import Host from '../../Componenets/Admin/hostPage/Host'


function AdminHost() {
  return (
    <div className="flex bg-gray-100 w-[100vw]">
    <div className="w-full flex">
      <div className="w-[15vw] h-[100vh]   ">
        <Sidebar />
      </div>
      <div className="w-[85vw] flex-1  ">
        <Host/>
      </div>
    </div>
  </div>
  )
}

export default AdminHost
