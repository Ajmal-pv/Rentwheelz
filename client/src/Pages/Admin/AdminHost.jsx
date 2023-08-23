import React from 'react'
import Sidebar from '../../Componenets/Admin/Home/Sidebar'
import Host from '../../Componenets/Admin/hostPage/Host'


function AdminHost() {
  return (
    <div>
    
      <div className="flex h-screen bg-gray-100">
       <Sidebar/>
      <Host/>
      </div>
    </div>
  )
}

export default AdminHost
