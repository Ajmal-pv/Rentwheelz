import React from 'react'
import Home from '../../Componenets/Host/Home/Home'
import Sidebar from '../../Componenets/Host/Home/Sidebar'

function HostHome() {
  return (
    
    <div className="flex h-screen bg-gray-100">
     <Sidebar/> 
      <Home/>
    </div>
  )
}

export default HostHome
