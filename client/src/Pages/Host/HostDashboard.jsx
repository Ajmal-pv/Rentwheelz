import React from 'react'
import Sidebar from '../../Componenets/Host/Home/Sidebar'

function HostDashboard() {
  return (
    <div className="flex bg-gray-100">
    <Sidebar />
    <div className="flex-1 overflow-y-auto">
      <Dashboard />
    </div>
  </div>
  
  )
}

export default HostDashboard